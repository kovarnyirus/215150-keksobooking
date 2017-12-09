'use strict';
(function () {
  var MAP_PIN_WIDTH = 45;
  var MAP_PIN_HEIGHT = 62;
  var ENTER_KEYCODE = 13;
  var mapPin = window.card.mapCardTemplate.querySelector('.map__pin');


  function createMapPin(index) {
    var mapPinChild = mapPin.cloneNode(true);
    var mapPinChildImg = mapPinChild.querySelector('img');
    var xPosition = window.data.similarArray[index].location.x - MAP_PIN_WIDTH / 2;
    var yPosition = window.data.similarArray[index].location.y - MAP_PIN_HEIGHT;

    mapPinChild.setAttribute('style', 'left:' + xPosition + 'px; top:' + yPosition + 'px');
    mapPinChild.setAttribute('id', +[index]);
    mapPinChildImg.setAttribute('src', window.data.similarArray[index].author.avatar);
    return mapPinChild;
  }

  function onMapPinsEnterPress(event) {
    if (event.keyCode === ENTER_KEYCODE) {
      window.card.onPopupOpen(event);
    }
  }

  function renderMapPins(array) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(createMapPin(i));
    }
    window.map.mapPins.appendChild(fragment);
  }

  window.pin = {
    MAP_PIN_WIDTH: MAP_PIN_WIDTH,
    MAP_PIN_HEIGHT: MAP_PIN_HEIGHT,
    ENTER_KEYCODE: ENTER_KEYCODE,
    renderMapPins: renderMapPins,
    onMapPinsEnterPress: onMapPinsEnterPress
  };
})();
