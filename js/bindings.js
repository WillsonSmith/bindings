//require("babel/polyfill");
//let assign = require("lodash/object/assign");
let bindings = function bindings(/*extendProto*/) {

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

  // if (extendProto) {
  //   assign(prototype, extendProto);
  // }
  return prototype;

};

let boundDocument = bindings();
