"use strict";

// Task: refactor callback hell code with named callbacks
// Restriction: you can change code only in "Usage" section

const getPurchase = (callback) =>
  callback({
    Electronics: [
      { name: "Laptop", price: 1500 },
      { name: "Keyboard", price: 100 },
      { name: "HDMI cable", price: 10 },
    ],
    Textile: [{ name: "Bag", price: 50 }],
  });

const iterateGroups = (order, callback) => {
  for (const groupName in order) {
    const group = order[groupName];
    callback(group);
  }
};

const groupTotal = (items, callback) => {
  let total = 0;
  for (const item of items) {
    total += item.price;
  }
  callback(total);
};

const budget = (limit) => {
  let balance = limit;

  const withdraw = (value, callback) => {
    const success = balance >= value;
    if (success) balance -= value;
    callback(success);
  };

  const rest = (callback) => callback(balance);

  return { withdraw, rest };
};

// Usage
//
// Original result
// { success: true, amount: 1610, subtotal: 1610, balance: 40 }
// { success: false, amount: 1610, subtotal: 50, balance: 40 }

const wallet = budget(1650);

const handlePurchase = (purchase) => {
  const state = { amount: 0 };
  iterateGroups(purchase, handleGroup(state));
};

const handleGroup = (state) => {
  return (group) => {
    groupTotal(group, handleSubtotal(state));
  };
};

const handleSubtotal = (state) => {
  return (subtotal) => {
    state.subtotal = subtotal;
    wallet.withdraw(subtotal, handleWithdraw(state));
  };
};

const handleWithdraw = (state) => {
  return (success) => {
    if (success) state.amount += state.subtotal;
    state.success = success;
    wallet.rest(handleRest(state));
  };
};

const handleRest = (state) => {
  return (balance) => {
    console.log({
      success: state.success,
      amount: state.amount,
      subtotal: state.subtotal,
      balance,
    });
  };
};

getPurchase(handlePurchase);
