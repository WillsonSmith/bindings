//require("babel/polyfill");
//let assign = require("lodash/object/assign");

let bindings = function bindings(/*extendProto*/) {

  let elements = Array.from(document.querySelectorAll("[bindings]"));

  elements.forEach(function(element) {
    let args = element.getAttribute("bindings");
    args = args.split(",").map((arg) => arg.trim());

    if (args[1] === "this") {
      args[1] = element;
    }
    //if not this, create a context. if context exists: use that

    let func = eval(`${args.shift()}`);
    if (func) {
      func(...args);
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
