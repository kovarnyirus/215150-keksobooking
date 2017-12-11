'use strict';
(function () {
  var MAP_PIN_WIDTH = 45;
  var MAP_PIN_HEIGHT = 62;
  var mapPin = window.card.mapCardTemplate.querySelector('.map__pin');


  function createMapPin(element, index) {
    var mapPinChild = mapPin.cloneNode(true);
    var mapPinChildImg = mapPinChild.querySelector('img');
    var xPosition = element[index].location.x - MAP_PIN_WIDTH / 2;
    var yPosition = element[index].location.y - MAP_PIN_HEIGHT;

    mapPinChild.setAttribute('style', 'left:' + xPosition + 'px; top:' + yPosition + 'px');
    mapPinChild.setAttribute('id', +[index]);
    mapPinChildImg.setAttribute('src', element[index].author.avatar);
    return mapPinChild;
  }

  function onMapPinsEnterPress(event) {
    if (window.utils.isEnterKeyPress(event)) {
      window.card.onPopupOpen(event);
    }
  }

  function renderMapPins(dataArray) {
    window.map.mapPins.appendChild(window.utils.fillFragmentWith(dataArray, createMapPin));
  }

  window.pin = {
    MAP_PIN_WIDTH: MAP_PIN_WIDTH,
    MAP_PIN_HEIGHT: MAP_PIN_HEIGHT,
    renderMapPins: renderMapPins,
    onMapPinsEnterPress: onMapPinsEnterPress
  };
})();
