let product = { price: 5, quantity: 2 };
let total = 0;

let effect = () => {
  total = product.price * product.quantity;
};

const depsMap = new Map();
// A map where we store the dependency object for each property

function track(key) {
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set())); // no dep yet, let's create one
  }

  dep.add(effect); // since it's a set, it won't add the effect again if it already exists
}

function trigger(key) {
  let dep = depsMap.get(key); // get the dep for this key
  // if it exists, run each effect
  if (dep) {
    dep.forEach((effect) => {
      effect();
    });
  }
}

track("quantity");
effect();

console.log("total", total);
product.quantity = 3;
trigger("quantity");
console.log("total", total);
