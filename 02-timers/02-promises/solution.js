"use strict";

import { setTimeout } from "node:timers/promises";

// Task: rewrite this synchronous code to asynchronous
// using `setTimeout` from 'node:timers/promises'

const sleep = (msec) => {
  return setTimeout(msec, () => {
    console.log("timeout end");
  });
};

console.log({ start: new Date().toISOString() });
console.log("Wait 3 sec...");
// for tests
setInterval(() => {
  console.log("ping", new Date().toISOString());
}, 500);
//
await sleep(3000);
console.log({ finish: new Date().toISOString() });
