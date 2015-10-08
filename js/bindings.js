//require("babel/polyfill");
let bindings = function bindings() {

  let elements = [].slice.call(document.querySelectorAll("[bindings]"));
  let contexts = {};

  elements.forEach(function(element) {
    let args = element.getAttribute("bindings");
    let context = element.getAttribute("context");
    args = args.split(",").map(function(arg) {
      arg = arg.trim();
      if (arg === "this") {
        return element;
      }
      return arg;
    });

    let func = eval(`${args.shift()}`);

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

  });

  let prototype = {
    elements: elements,
    getBoundElements() {
      return elements;
    }
  };

  return prototype;

};

bindings();
