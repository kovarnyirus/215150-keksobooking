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
// hasClass проверяет куда был совершен клик, и если он был сделан по карте завершает функцию.
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

  function isEscKeyPress(event) {
    return event.keyCode === ESC_KEYCODE;
  }

  function isEnterKeyPress(event) {
    return event.keyCode === ENTER_KEYCODE;
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
