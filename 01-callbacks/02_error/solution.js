"use strict";

// Task: return an error for items with negative price
// Hint: use callback-last-error-first contract

const electronics = [
  { name: "Laptop", price: -1500 },
  { name: "Keyboard", price: 100 },
  { name: "HDMI cable", price: 10 },
];

const total = (items, callback) => {
  let money = 0;
  for (const { price } of items) {
    const isNegativePrice = price < 0;
    if (isNegativePrice) {
      const err = new Error("Items contains negative price");
      return callback(err, money);
    }
    money += price;
  }
  callback(null, money);
};
const printMoney = (err, money) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log({ money });
};
total(electronics, printMoney);
