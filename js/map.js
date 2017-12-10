'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');

  function removeClass(element, className) {
    element.classList.remove(className);
  }
  function addClass(element, className) {
    element.classList.add(className);
  }

  function onMainPinClick(event) {
    map.classList.remove('map--faded');
    window.form.notice.querySelector('.notice__form').classList.remove('notice__form--disabled');
    window.pin.renderMapPins(window.data.similarArray);
    mapPinMain.removeEventListener('mouseup', onMainPinClick);
    mapPins.addEventListener('mouseup', window.card.onPopupOpen);
    mapPins.addEventListener('keydown', window.pin.onMapPinsEnterPress);
    window.form.runForm(event);
  }

  function hasClass(element, className) {
    if (element) {
      return element.classList.contains(className);
    } else {
      return false;
    }
  }

  function getTargetElement(event) {
    if (hasClass(event.target.parentElement, 'map__pin')) {
      return event.target.parentElement;
    }
    return hasClass(event.target, 'map__pin') ? event.target : false;
  }

  window.map = {
    mapPinMain: mapPinMain,
    onMainPinClick: onMainPinClick,
    removeClass: removeClass,
    map: map,
    mapPins: mapPins,
    getTargetElement: getTargetElement,
    hasClass: hasClass,
    addClass: addClass
  };

  window.form.disableForm();

})();
