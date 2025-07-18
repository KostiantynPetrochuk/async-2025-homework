'use strict';

// Task: fix given code to prevent removing items from
// `electronics` array and to stop iteration after last item

const { setInterval } = require('node:timers/promises');

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

const main = async () => {
  const maxIndex = electronics.length - 1;
  let currentIndex = 0;
  const delay = 1000;
  const iter = setInterval(delay, electronics);
  for await (const items of iter) {
    if (currentIndex > maxIndex) {
      console.log('Counting ended.');
      break;
    }
    console.log({ item: items[currentIndex] });
    currentIndex++;
  }
};

main();
