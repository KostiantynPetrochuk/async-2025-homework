'use strict';

// Task: support rejection with an error, if no more items in
// `items` array are available to return with `.next()`
// Change throwing error to returning rejected Promise.
// Catch error with `.catch` or `try/catch` to handle it.

const iterate = (items) => {
  let index = 0;
  return {
    next: () =>
      new Promise((resolve, reject) => {
        if (index < items.length) {
          return resolve(items[index++]);
        }
        reject(new Error('No more items to iterate'));
      }),
  };
};

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

const main = async () => {
  try {
    const items = iterate(electronics);
    const firstItem = await items.next();
    console.log(firstItem);
    const secondItem = await items.next();
    console.log(secondItem);
    const thirdItem = await items.next();
    console.log(thirdItem);
    const fourthItem = await items.next();
    console.log(fourthItem);
  } catch (error) {
    console.error(error);
  }
};

main();
