'use strict';
(function () {
  function removeClass(element, className) {
    element.classList.remove(className);
  }

  function addClass(element, className) {
    element.classList.add(className);
  }

  function hasClass(element, className) {
    if (element) {
      return element.classList.contains(className);
    } else {
      return false;
    }
  }

  function getTargetElement(event, className) {
    if (window.utils.hasClass(event.target.parentElement, className)) {
      return event.target.parentElement;
    }
    return window.utils.hasClass(event.target, className) ? event.target : false;
  }

  function setFieldValue(element, value) {
    element.value = value;
  }

  function disableOptions(elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', 'disabled');
    }
  }

  function enableElements(parentItem, childItems) {
    var elements = parentItem.querySelectorAll(childItems);
    elements.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  }

  function disableElements(elements) {
    elements.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
  }

  window.utils = {
    removeClass: removeClass,
    addClass: addClass,
    hasClass: hasClass,
    getTargetElement: getTargetElement,
    setFieldValue: setFieldValue,
    disableOptions: disableOptions,
    enableElements: enableElements,
    disableElements: disableElements

  };
})();
