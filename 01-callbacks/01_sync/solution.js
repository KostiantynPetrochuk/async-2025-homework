"use strict";

// Task: rewrite function to return result into sync callback
// Change signature to: (items, callback(result))
// Use new signature total(electronics, (money) => ...)

const electronics = [
  { name: "Laptop", price: 1500 },
  { name: "Keyboard", price: 100 },
  { name: "HDMI cable", price: 10 },
];
const total = (items, callback) => {
  let money = 0;
  for (const { price } of items) {
    money += price;
  }
  callback(money);
};
const printMoney = (money) => console.log({ money });
total(electronics, printMoney);
