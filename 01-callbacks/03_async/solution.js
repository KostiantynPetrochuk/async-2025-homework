"use strict";

// Task: rewrite `total` function to be async with JavaScript timers
// Use `setInterval` and `clearInterval` to check next item each 1 second
// Calculations will be executed asynchronously because of timers
// Run `total` twice (as in example below) but in parallel
// Print debug output for each calculation step (each second)
//
// Hint: example output:
// { check: { item: { name: 'Laptop', price: 1500 } } }
// { check: { item: { name: 'Laptop', price: 1500 } } }
// { check: { item: { name: 'Keyboard', price: 100 } } }
// { check: { item: { name: 'Keyboard', price: 100 } } }
// { check: { item: { name: 'HDMI cable', price: 10 } } }
// { check: { item: { name: 'HDMI cable', price: 10 } } }
// { money: 1610 }
// { money: 1610 }
//
const electronics = [
  { name: "Laptop", price: 1500 },
  { name: "Keyboard", price: 100 },
  { name: "HDMI cable", price: 10 },
];

const launchInterval = (interval, callback) => setInterval(callback, interval);

const total = (items, callback) => {
  const localItems = [...items];
  let money = 0;
  const procesItem = () => {
    const item = localItems.shift();
    if (!item) {
      clearInterval(timerId);
      callback(null, money);
      return;
    }
    console.log({ check: item });
    const { price } = item;
    const isNegativePrice = price < 0;
    if (isNegativePrice) {
      const err = new Error("Items contains negative price");
      clearInterval(timerId);
      return callback(err, money);
    }
    money += price;
  };
  const interval = 1000;
  const timerId = launchInterval(interval, procesItem);
};
const printMoney = (err, money) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log({ money });
};
total(electronics, printMoney);
total(electronics, printMoney);
