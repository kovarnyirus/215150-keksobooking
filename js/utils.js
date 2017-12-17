'use strict';
(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var COUNT_PINS = 5;
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

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

  function debounce(fun) {

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  }

  function compareRandom() {
    return Math.random() - 0.5;
  }

  function getRandomBetween(minValue, maxValue) {
    return Math.round(Math.random() * (maxValue - minValue) + minValue);
  }

  function getRandomArrayItems(array, items) {
    return cloneArray(array).sort(compareRandom).slice(0, ++items);
  }

  // не пойму почему ошибка пр  использовании for, с forEach работает хорошо но не могу гограничить вывод винов 5

  function fillFragmentWith(dataArray, cb) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i <= COUNT_PINS; i++) {
      fragment.appendChild(cb(dataArray[i], i));
    }
    return fragment;
  }

  // function fillFragmentWith(dataArray, cb) {
  //   var fragment = document.createDocumentFragment();
  //   dataArray.forEach(function (item, i) {
  //     fragment.appendChild(cb(item, i));
  //   });
  //   return fragment;
  // }

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
    debounce: debounce
  };
})();
