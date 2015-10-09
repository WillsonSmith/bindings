(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//require("babel/polyfill");
"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var bindings = function bindings() {

  var elements = [].slice.call(document.querySelectorAll("[bindings]"));
  var contexts = {};

  var collectedFunctions = {};

  function bind(element) {
    var args = element.getAttribute("bindings");
    var context = element.getAttribute("context");
    args = args.split(",").map(function (arg) {
      arg = arg.trim();
      if (arg === "this") {
        return element;
      }
      return arg;
    });
    var func = collectedFunctions[args.shift()];
    if (context) {
      if (!contexts[context]) {
        contexts[context] = {};
      }
      func.apply(undefined, _toConsumableArray(args).concat([contexts[context]]));
    } else {
      if (func) {
        func.apply(undefined, _toConsumableArray(args));
      }
    }
  }

  function initialize() {
    elements.forEach(bind);
  }

  var prototype = {
    elements: elements,
    getBoundElements: function getBoundElements() {
      return elements;
    },
    registeredFunctions: {
      get: function get() {
        return collectedFunctions;
      },
      set: function set(functions) {
        functions.forEach(function (f) {
          if (!collectedFunctions[f.name]) {
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

},{}]},{},[1]);
