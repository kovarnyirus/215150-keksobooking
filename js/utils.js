'use strict';
(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500;


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
    if (hasClass(event.target.parentElement, className)) {
      return event.target.parentElement;
    }
    return hasClass(event.target, className) ? event.target : false;
  }

  function setFieldValue(element, value) {
    element.value = value;
  }

  function enableElements(parentItem, childItems) {
    var elements = parentItem.querySelectorAll(childItems);
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }
    // elements.forEach(function (item) {
    //   item.removeAttribute('disabled');
    // });
  }

  function disableElements(elements) {
    // console.log(typeof elements);
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', 'disabled');
    }
    // elements.map(function (item) {
    //   item.setAttribute('disabled', 'disabled');
    // });
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

  function debounce(fun, interval) {
    var timer;
    return function () {
      var arg = arguments;

      function callable() {
        clearInterval(timer);
        timer = null;
        fun.apply(null, arg);
      }

      if (!timer) {
        timer = setTimeout(callable, interval);
      }
    };
  }

  function compareRandom() {
    return Math.random() - 0.5;
  }

  function getRandomBetween(minValue, maxValue) {
    return Math.round(Math.random() * (maxValue - minValue) + minValue);
  }

  function getRandomArrayItems(array, items) {
    return cloneArray(array).sort(compareRandom).slice(0, items);
  }

  function fillFragmentWith(dataArray, cb) {
    var fragment = document.createDocumentFragment();
    dataArray.forEach(function (item, i) {
      fragment.appendChild(cb(item, i));
    });
    return fragment;
  }

  window.utils = {
    removeClass: removeClass,
    addClass: addClass,
    hasClass: hasClass,
    getTargetElement: getTargetElement,
    setFieldValue: setFieldValue,
    enableElements: enableElements,
    disableElements: disableElements,
    isEnterKeyPress: isEnterKeyPress,
    isEscKeyPress: isEscKeyPress,
    cloneArray: cloneArray,
    compareRandom: compareRandom,
    getRandomBetween: getRandomBetween,
    getRandomArrayItems: getRandomArrayItems,
    fillFragmentWith: fillFragmentWith,
    debounce: debounce,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL
  };
})();
