'use strict';

// Task: rewrite `total` from callbacks contract to promises
// Hint: do not use `async () =>` syntax

const total = (items) =>
  new Promise((resolve, reject) => {
    let result = 0;
    for (const item of items) {
      if (item.price < 0) {
        reject(new Error('Negative price is not allowed'));
        return;
      }
      result += item.price;
    }
    resolve(result);
  });

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

total(electronics)
  .then((money) => {
    console.log({ money });
  })
  .catch((error) => {
    console.error({ error });
  });
