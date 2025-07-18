'use strict';

const { setTimeout } = require('node:timers/promises');

// Task: rewrite this synchronous code to asynchronous
// using `setTimeout` from 'node:timers/promises'

const sleep = (msec) =>
  setTimeout(msec, () => {
    console.log('timeout end');
  });

console.log({ start: new Date().toISOString() });
console.log('Wait 3 sec...');
// for tests
setInterval(() => {
  console.log('ping', new Date().toISOString());
}, 500);
//

const main = async () => {
  await sleep(3000);
  console.log({ finish: new Date().toISOString() });
};

main();
