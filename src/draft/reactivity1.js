let price = 5;
let quantity = 2;
let total = price * quantity;

let product = { price: 5, quantity: 2 };
// A dependency which is a set pf effects that should get re=run when values change

function log(text, color = null) {
  return console.log(text, color);
}
function questionLog(text) {
  return log(`%c${text}`, "color: GoldenRod");
}
function endQuestionLog() {
  return log("%c<!-- eof: question -->", "color: crimson");
}

questionLog("How does Vue knows to update all the things?");
console.log(`total is ${total}`); // 10

price = 20;

console.log(`total is ${total}`); // 10
endQuestionLog();

let dep = new Set(); // to store our effect

// effect() – run this effect
let effect = () => (total = price * quantity);

// track() – save this codelet effect = () => (total = price * quantity);
function track() {
  dep.add(effect); // add the code
}

// trigger() – run all the code I've saved
function trigger() {
  dep.forEach((effect) => effect()); // re-run all the code in storage
}

questionLog(
  "How can we save the total calculation, so we can run it again when price or quantity updates?"
);
console.log("total", total);
quantity = 3;
console.log("total", total);
trigger();
console.log("total", total);
endQuestionLog();
