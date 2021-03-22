import { reactive, ref, effect } from "../helpers";

function computed(getter) {
  /*
    Create a reactive reference called result
    Run the getter in an effect() which sets the result.value
  */
  let result = ref();
  console.log(getter());
  effect(() => (result.value = getter()));

  return result;
}

let product = reactive({ price: 5, quantity: 2 });

let salePrice = computed(() => {
  return product.price * 0.9;
});

let total = computed(() => {
  return salePrice.value * product.quantity;
});

console.log(
  `Before updated total should be 10) = ${total} salePrice (should be 4.5) = ${salePrice}`
);
product.quantity = 3;
console.log(
  `After updated total should be 13.5) = ${total} salePrice (should be 4.5) = ${salePrice}`
);
product.price = 10;
console.log(
  `After updated total should be 27) = ${total} salePrice (should be 9) = ${salePrice}`
);
