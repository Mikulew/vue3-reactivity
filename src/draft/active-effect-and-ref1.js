const targetMap = new WeakMap();

/*
  before:
  let effect = () => { total = product.price * product.quantity };
*/

let activeEffect = null; // the active effect running

function effect(eff) {
  activeEffect = eff; // set this as the activeEffect
  activeEffect(); // run it
  activeEffect = null; // unset it
}

function track(target, key) {
  if (activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = new Set()));
    }
    dep.add(activeEffect);
  }
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

function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      let result = Reflect.get(target, key, receiver);
      track(target, key);

      return result;
    },
    set(target, key, value, receiver) {
      let oldValue = Reflect.get(target, key);
      let result = Reflect.set(target, key, value, receiver);
      if (result && oldValue !== value) {
        trigger(target, key);
      }

      return result;
    }
  };

  return new Proxy(target, handler);
}

let product = reactive({ price: 5, quantity: 2 });
let total = 0;
let salePrice = 0;

effect(() => {
  total = product.price * product.quantity;
});
effect(() => {
  salePrice = product.price * 0.9;
});

/*
track gets called when we GET a property on our reactive object,
even if we're not in an effect
*/

console.log(
  `Before updated total (should be 10) = ${total} salePrice (should be 4.5) = ${salePrice}`
);
product.quantity = 3;
console.log(
  `After updated total (should be 15) = ${total} salePrice (should be 4.5) = ${salePrice}`
);
product.price = 10;
console.log(
  `After updated total (should be 30) = ${total} salePrice (should be 9) = ${salePrice}`
);
