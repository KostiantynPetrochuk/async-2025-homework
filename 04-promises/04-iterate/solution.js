'use strict';

// Task: change `iterate` contract from chainable callbacks
// to Promise (chainable or you can call it with await syntax)

const iterate = (items) => {
  let index = 0;
  const chain = {
    next: () =>
      new Promise((resolve, reject) => {
        if (index < items.length) {
          resolve(items[index++]);
        } else {
          reject(undefined);
        }
      }),
  };
  return chain;
};

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

// Use await syntax to get items

const main = async () => {
  const items = iterate(electronics);
  const firstItem = await items.next();
  console.log(firstItem);
  const secondItem = await items.next();
  console.log(secondItem);
  const thirdItem = await items.next();
  console.log(thirdItem);
};

main();
