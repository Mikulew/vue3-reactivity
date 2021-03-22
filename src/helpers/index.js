// LOGS

export function log(text, color = null) {
  return console.log(text, color);
}

export function questionLog(text) {
  return log(`%c${text}`, "color: GoldenRod");
}

export function endQuestionLog() {
  return log("%c<!-- eof: question -->", "color: crimson");
}

// REACTIVITY

const targetMap = new WeakMap();

let activeEffect = null;

function effect(eff) {
  activeEffect = eff;
  activeEffect();
  activeEffect = null;
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
  if (!dep) {
    dep.forEach((effect) => {
      effect();
    });
  }
}

export function reactive(target) {
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

export function ref(raw) {
  const r = {
    get value() {
      track(r, "value");
      return raw;
    },
    set value(newValue) {
      raw = newValue;
      trigger(r, "value");
    }
  };
  return r;
}
