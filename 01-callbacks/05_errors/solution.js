"use strict";

// Task: rewrite error handling to use callback-last-error-first
// contract to return errors instead of throwing them.
// So remove all try/catch blocks and pass errors to callbacks.
// Hint: You may also use error.cause to wrap escalated errors.
// Extra credit task: use AggregateError to combine escalated errors.
// Extra credit task: fix eslint error: "Function declared in a loop
//   contains unsafe references to variable(s) 'total'  no-loop-func"

const MAX_PURCHASE = 2000;

const calculateSubtotal = (goods, callback) => {
  let amount = 0;
  for (const item of goods) {
    if (typeof item.name !== "string") {
      const err = new Error("Noname in item in the bill");
      return void err;
    }
    if (typeof item.price !== "number") {
      const err = new Error(`${item.name} price expected to be number`);
      return void err;
    }
    if (item.price < 0) {
      const err = new Error(`Negative price for ${item.name}`);
      return void err;
    }
    amount += item.price;
  }
  return void callback(err, amount);
};

const calculateTotal = (order, callback) => {
  const expenses = new Map();
  let total = 0;
  const amounts = [];
  const errorsArr = [];
  for (const groupName in order) {
    const goods = order[groupName];
    calculateSubtotal(goods, (err, amount) => {
      if (err) {
        const errDesc = `Failed to calculate subtotal for group "${groupName}"`;
        const currentErr = new Error(errDesc, { cause: err });
        return void errorsArr.push(currentErr);
      }
      amounts.push(amount);
      expenses.set(groupName, amount);
    });
    if (total > MAX_PURCHASE) {
      errorsArr.push(new Error('Total is above the limit'));
      break;
    }
  }
  if (errorsArr?.length) {
    const cause = new AggregateError(errorsArr, 'Caused by');
    const error = new Error('Can not calculate total', { cause });
    return void callback(error);
  }
  return void callback(null, {
    total,
    expenses,
  });
};

const purchase = {
  Electronics: [
    { name: "Laptop", price: 1500 },
    { name: "Keyboard", price: 100 },
    { name: "HDMI cable" },
  ],
  Textile: [{ name: "Bag", price: 50 }, { price: 20 }],
};

console.log({ purchase });
calculateTotal(purchase, (err, bill) => {
  if (err) {
    console.log({ err });
    return;
  }
  console.log({ bill });
});
