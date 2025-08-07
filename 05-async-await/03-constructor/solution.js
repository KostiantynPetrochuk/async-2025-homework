'use strict';

// Task: rewrite class Basket to class Total with async constructor
// Constructor call example:
//   const total = await new Total(electronics);
//   console.log({ total });

class Total {
  #items = null;

  constructor(items) {
    this.#items = items;
    return this.total();
  }

  async total() {
    let result = 0;
    for (const item of this.#items) {
      if (item.price < 0) {
        throw new Error('Negative price is not allowed');
      }
      result += item.price;
    }
    return result;
  }
}

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

const main = async () => {
  try {
    const total = await new Total(electronics);
    console.log({ total });
  } catch (error) {
    console.error({ error });
  }
};

main();
