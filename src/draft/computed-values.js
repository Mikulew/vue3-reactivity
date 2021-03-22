import { reactive } from "../helpers";

function computed(getter) {
  /*
    Create a reactive reference called result
    Run the getter in an effect() which sets the result.value
  */
}

let product = reactive({ price: 5, quantity: 2 });

let salePrice = computed(() => {
  return product.price * 0.9;
});

let total = computed(() => {
  return salePrice.value;
});
