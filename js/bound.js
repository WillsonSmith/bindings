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

  textBox.addEventListener("keyup", function(e) {
    nodeInfo.content = this.value;
    node.textContent = nodeInfo.content;
  });

};
