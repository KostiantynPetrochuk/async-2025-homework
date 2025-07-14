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
  let err = null;
  for (const item of goods) {
    if (typeof item.name !== "string") {
      err = new Error("Noname in item in the bill");
      break;
    }
    if (typeof item.price !== "number") {
      err = new Error(`${item.name} price expected to be number`);
      break;
    }
    if (item.price < 0) {
      err = new Error(`Negative price for ${item.name}`);
      break;
    }
    amount += item.price;
  }
  callback(err, amount);
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
        errorsArr.push(currentErr);
        return;
      }
      amounts.push(amount);
      expenses.set(groupName, amount);
    });
  }
  for (const key in amounts) {
    total += amounts[key];
    if (total > MAX_PURCHASE) {
      errorsArr.push(new Error("Total is above the limit"));
    }
  }
  let errors = null;
  if (errorsArr?.length) {
    errors = new AggregateError(errorsArr, "Failed to calculete total amount.");
  }
  return callback(errors, {
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
