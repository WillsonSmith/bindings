let bindings = require("./bindings");
let samples = {};
let boundDocument;

samples.numberHandler = function numberHandler(element, context) {

  let increment = 0;

  let prototype = {
    setElementValue() {
      element.textContent = increment;
    },
    increment() {
      increment++;
      this.setElementValue();
      return increment;
    },
    decrement() {
      increment--;
      this.setElementValue();
      return increment;
    }
  };
  if (context) {
    context.numberHandler = prototype;
  }

  return prototype;

};

samples.incrementButton = function incrementButton(button, contextFunction, context) {
  button.addEventListener("click", function() {
    context[contextFunction].increment();
  });
};
samples.decrementButton = function decrementButton(button, contextFunction, context) {
  button.addEventListener("click", function() {
    context[contextFunction].decrement();
  });
};

samples.incrementSelf = function incrementSelf(button, startValue) {
  let increment = Number(startValue) || 0;
  button.textContent = increment;
  button.addEventListener("click", function() {
    this.textContent = increment++;
  });
};

window.samples = samples;
boundDocument = bindings();
boundDocument.registeredFunctions.set([samples.numberHandler, samples.incrementButton, samples.decrementButton, samples.incrementSelf]);
window.bound = boundDocument;
// boundDocument.registerFunction(samples.numberHandler);
