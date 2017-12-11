'use strict';
(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  function removeClass(element, className) {
    element.classList.remove(className);
  }

  function addClass(element, className) {
    element.classList.add(className);
  }

  function hasClass(element, className) {
    if (element) {
      return element.classList.contains(className);
    }
    return false;
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
    elements.forEach(function (item, i) {
      elements[i].setAttribute('disabled', 'disabled');
    });
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

  function isEscKeyPress(event) {
    return event.keyCode === ESC_KEYCODE;
  }

  function isEnterKeyPress(event) {
    return event.keyCode === ENTER_KEYCODE;
  }

  function cloneArray(array) {
    return array.concat();
  }

  function compareRandom() {
    return Math.random() - 0.5;
  }

  function getRandomBetween(minValue, maxValue) {
    return Math.round(Math.random() * (maxValue - minValue) + minValue);
  }

  function getRandomArrayItems(array, items) {
    return cloneArray(array).sort(compareRandom).slice(0, items + 1);
  }

  function fillFragmentWith(dataArray, cb) {
    var fragment = document.createDocumentFragment();
    dataArray.forEach(function (item, i) {
      fragment.appendChild(cb(item, i));
    });
    // for (var i = 0; i < dataArray.length; i++) {
    //   fragment.appendChild(cb(dataArray, i));
    // }
    return fragment;
  }

  window.utils = {
    removeClass: removeClass,
    addClass: addClass,
    hasClass: hasClass,
    getTargetElement: getTargetElement,
    setFieldValue: setFieldValue,
    disableOptions: disableOptions,
    enableElements: enableElements,
    disableElements: disableElements,
    isEnterKeyPress: isEnterKeyPress,
    isEscKeyPress: isEscKeyPress,
    cloneArray: cloneArray,
    compareRandom: compareRandom,
    getRandomBetween: getRandomBetween,
    getRandomArrayItems: getRandomArrayItems,
    fillFragmentWith: fillFragmentWith
  };
})();
