//require("babel/polyfill");
let bindings = function bindings(functionsArray) {

  let elements = [].slice.call(document.querySelectorAll("[bindings]"));
  let contexts = {};
  let collectedFunctions = {};

  let prototype = {
    elements: elements,
    getBoundElements() {
      return elements;
    },
    getRegisteredFunctions(){
      return collectedFunctions;
    }
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

  function registerFunctions(functions) {
    functions.forEach(function(f) {
      if (!collectedFunctions[f.name]) {
        collectedFunctions[f.name] = f;
      }
    });
  }

  function initialize() {
    registerFunctions(functionsArray);
    elements.forEach(bindElement);
  }

  initialize();

  return prototype;

};

module.exports = bindings;
