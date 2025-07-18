'use strict';

// Task: rewrite this synchronous code to asynchronous
// Promise-returning function with `setTimeout`

const timeout = (delay, handler) => setTimeout(handler, delay);

const sleep = (msec) =>
  new Promise((resolve) => {
    timeout(msec, resolve);
  });

const main = async () => {
  console.log({ start: new Date().toISOString() });
  console.log('Wait 3 sec...');
  // for tests
  setInterval(() => {
    console.log('ping', new Date().toISOString());
  }, 500);
  //
  await sleep(3000);
  console.log({ finish: new Date().toISOString() });
};

main();
