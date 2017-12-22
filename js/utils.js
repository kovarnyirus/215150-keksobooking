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
    return element && element.classList.contains(className);
  }

  function getTargetElement(evt, className) {
    if (hasClass(evt.target.parentElement, className)) {
      return evt.target.parentElement;
    }
    return hasClass(evt.target, className) ? evt.target : false;
  }

  function setFieldValue(element, value) {
    element.value = value;
  }

  function enableElements() {
    var elements = window.form.fieldsetItems;
    [].forEach.call(elements, function (item) {
      item.removeAttribute('disabled');
    });
  }

  function disableElements(elements) {
    [].forEach.call(elements, function (item) {
      item.setAttribute('disabled', 'disabled');
    });
  }

  function isEscKeyPress(evt) {
    return evt.keyCode === ESC_KEYCODE;
  }

  function isEnterKeyPress(evt) {
    return evt.keyCode === ENTER_KEYCODE;
  }

  function debounce(cb, interval) {
    var timer;

    return function () {
      var arg = arguments;
      function callable() {
        clearInterval(timer);
        timer = null;
        cb.apply(null, arg);
      }
      if (!timer) {
        timer = setTimeout(callable, interval);
      }
    };
  }

  function fillFragmentWith(elements, cb) {
    var fragment = document.createDocumentFragment();
    elements.forEach(function (item, i) {
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
    fillFragmentWith: fillFragmentWith,
    debounce: debounce,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL
  };
})();
