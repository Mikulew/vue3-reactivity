let product = { price: 5, quantity: 2 };
let total = 0;
let effect = () => {
  total = product.price * product.quantity;
};

// where we store the dependencies associated with each reactive object's properties
const targetMap = new WeakMap();

function track(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    // where we store dependencies for each property
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    // A dependency which is a set of effects that should get re-run when values change
    depsMap.set(key, (dep = new Set()));
  }
  dep.add(effect);
}

function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let dep = depsMap.get(key);
  if (dep) {
    dep.forEach((effect) => {
      effect();
    });
  }
}

track(product, "quantity");
effect();

console.log("total", total);
product.quantity = 3;
console.log("total", total);
trigger(product, "quantity");
console.log("total", total);
