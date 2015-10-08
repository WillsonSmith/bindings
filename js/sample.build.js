(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var samples = {};

samples.numberHandler = function numberHandler(element, context) {

  var _increment = 0;

  var prototype = {
    setElementValue: function setElementValue() {
      element.textContent = _increment;
    },
    increment: function increment() {
      _increment++;
      this.setElementValue();
      return _increment;
    },
    decrement: function decrement() {
      _increment--;
      this.setElementValue();
      return _increment;
    }
  };
  if (context) {
    context.numberHandler = prototype;
  }

  return prototype;
};

samples.incrementButton = function incrementButton(button, contextFunction, context) {
  button.addEventListener("click", function () {
    context[contextFunction].increment();
  });
};
samples.decrementButton = function incrementButton(button, contextFunction, context) {
  button.addEventListener("click", function () {
    context[contextFunction].decrement();
  });
};

window.samples = samples;

},{}]},{},[1]);
