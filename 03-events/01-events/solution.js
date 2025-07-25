'use strict';

// Task: rewrite EventTarget to EventEmitter
// Hint: you need Node.js >= v19.0.0

const EventEmitter = require('node:events');
const purchase = new EventEmitter();

purchase.on('buy', (event) => {
  const bought = event.detail;
  console.log({ bought });
});

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

for (const item of electronics) {
  const data = { detail: item };
  purchase.emit('buy', data);
}
