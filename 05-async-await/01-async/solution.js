'use strict';

// Task: rewrite `total` from callbacks contract to async/await
// Hint: do not forget to catch errors with try/catch block

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

const main = async () => {
  try {
    const result = await total(electronics);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

main();
