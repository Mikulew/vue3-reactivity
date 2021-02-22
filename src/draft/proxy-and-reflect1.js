let product = { price: 5, quantity: 2 };

// There are three ways to print out a property on an object

// Dot notation
console.log("quantity is " + product.quantity);

// Bracket notation
console.log("quantity is " + product["quantity"]);

// Use build-in Reflect.get method
console.log("quantity is " + Reflect.get(product, "quantity"));

/*
  Second parameter in proxy is called handler.
  In that handler you can send in a trap.
  A trap allow us ti intercept fundamental operations for example:
  – Property lookup
  – Enumeration
  – Function invocation
*/
let handler = {
  get(target, key, receiver) {
    console.log("Get was called with key = " + key);
    // return target[key];
    // We are better off using reflect here with an additional argument
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log("Set was called with key = " + key + " and value = " + value);
    return Reflect.set(target, key, value, receiver);
  }
};

// Proxy is a placeholder for another object, which by default delegates to the object.
let proxiedProduct = new Proxy(product, handler);
