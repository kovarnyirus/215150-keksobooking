'use strict';
( function () {
  var map = document.querySelector('.map');
  var MAP_PIN_WIDTH = 45;
  var MAP_PIN_HEIGHT = 62;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var mapPinActive;
  var popupClose;

  function createMapPin(index) {
    var mapPinChild = mapPin.cloneNode(true);
    var mapPinChildImg = mapPinChild.querySelector('img');
    var xPosition = similarArray[index].location.x - MAP_PIN_WIDTH / 2;
    var yPosition = similarArray[index].location.y - MAP_PIN_HEIGHT;

    mapPinChild.setAttribute('style', 'left:' + xPosition + 'px; top:' + yPosition + 'px');
    mapPinChild.setAttribute('id', +[index]);
    mapPinChildImg.setAttribute('src', similarArray[index].author.avatar);
    return mapPinChild;
  }

  function onMapPinsEnterPress(event) {
    if (event.keyCode === ENTER_KEYCODE) {
      onPopupOpen(event); // card
    }

  }

  function removeClass(element, className) {
    element.classList.remove(className);
  }

  function onPopupEscPress(event) {
    if (event.keyCode === ESC_KEYCODE) {
      onPopupClose();
      map.removeEventListener('keydown', onPopupEscPress);
    }
  }

  function onPopupClose() {
    var popup = map.querySelector('.popup');
    popup.remove();
    removeClass(mapPinActive, 'map__pin--active');
    map.removeEventListener('keydown', onPopupEscPress);
    popupClose.removeEventListener('keydown', onPopupCloseEnterPress);
  }

  function onPopupCloseEnterPress(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      onPopupClose();
    }
  }

})();
