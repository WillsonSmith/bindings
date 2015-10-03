var functions = {};
functions.bound = function bound(element, width, height) {
  element.style.width = width;
  element.style.height = height;
};
functions.setContent = function setContent(element, textContent) {
  element.textContent = textContent;
};

functions.bindBoxValue = function bindBoxValue(element) {
  var textBox = element.getElementsByTagName("input")[0];
  var node = element.getElementsByTagName("p")[0];
  var nodeInfo = {
    content: node.textContent
  };

  textBox.addEventListener("keyup", function() {
    nodeInfo.content = this.value;
    node.textContent = nodeInfo.content;
  });

};

functions.transformer = function transformer(element) {
  var el = element;
  return {
    background: function background(value) {
      console.log(value);
      el.style["background-color"] = value;
    },
    textCont: function textCont(value) {
      el.textContent = value;
    },
    width: function width(value) {
      el.style.width = value;
    },
    height: function height(value) {
      el.style.height = value;
    }
  };
};

functions.updateParent = function updateParent(element, context) {
  context.transformer.background("rgba(255,143,0,1)");
  element.addEventListener("keyup", function() {
    context.transformer.height(this.value + "px");
    context.transformer.width(this.value + "px");
  });
};
