const targetMap = new WeakMap();
let effect = () => (total = product.price * product.quantity);

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

effect();
console.log("total", total);
product.quantity = 3;
console.log("total", total);
