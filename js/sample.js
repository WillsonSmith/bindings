let samples = {};

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
samples.decrementButton = function incrementButton(button, contextFunction, context) {
  button.addEventListener("click", function() {
    context[contextFunction].decrement();
  });
};

window.samples = samples;
