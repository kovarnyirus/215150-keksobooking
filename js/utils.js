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

  function debounce(fun, DEBOUNCE_INTERVAL) {
    var timer;
    return function () {
      var context = this;
      var arg = arguments;
      function callable() {
        fun.apply(context, arg);
      }
      if (timer){
        clearInterval(timer);
        timer = null;
      }
      timer = setTimeout(callable, DEBOUNCE_INTERVAL);
    };
  };


  // function debouncer() {
  //   var callable;
  //   var timer;
  //   var args;
  //   var context = this;
  //   return function (fanc, INTERVAL) {
  //     callable = function() {
  //       args = arguments;
  //       clearInterval(timer);
  //       timer = null;
  //       fanc.apply(context, args);
  //     };
  //     if (!timer) {
  //       timer = setTimeout(callable, INTERVAL);
  //     }
  //   }
  // }

  function compareRandom() {
    return Math.random() - 0.5;
  }

  function getRandomBetween(minValue, maxValue) {
    return Math.round(Math.random() * (maxValue - minValue) + minValue);
  }

  function getRandomArrayItems(array, items) {
    return cloneArray(array).sort(compareRandom).slice(0, ++items);
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
