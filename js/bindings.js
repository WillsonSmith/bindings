//require("babel/polyfill");
let bindings = function bindings() {

  let elements = [].slice.call(document.querySelectorAll("[bindings]"));
  let contexts = {};

  let collectedFunctions = {

  };

  function bindElement(element) {
    let args = element.getAttribute("bindings");
    let context = element.getAttribute("context");
    args = args.split(",").map(function(arg) {
      arg = arg.trim();
      if (arg === "this") {
        return element;
      }
      return arg;
    });
    let func = collectedFunctions[args.shift()];
    if (context) {
      if (!contexts[context]) {
        contexts[context] = {};
      }
      func(...args, contexts[context]);
    } else {
      if (func) {
        func(...args);
      }
    }
  }

  function initialize() {
    elements.forEach(bindElement);
  }

  let prototype = {
    elements: elements,
    getBoundElements() {
      return elements;
    },
    registeredFunctions: {
      get() {
        return collectedFunctions;
      },
      set(functions) {
        functions.forEach(function(f) {
          if (!collectedFunctions[f.name]) { //could potentially also pass a string for a name
            collectedFunctions[f.name] = f;
          }
        });
        initialize();
      }
    }
  };

  return prototype;

};

module.exports = bindings;
