'use strict';
(function () {
  var MAP_PIN_WIDTH = 45;
  var MAP_PIN_HEIGHT = 62;
  var mapPin = window.card.mapCardTemplate.querySelector('.map__pin');

  function createMapPin(element, index) {
    var mapPinChild = mapPin.cloneNode(true);
    var mapPinChildImg = mapPinChild.querySelector('img');
    var xPosition = element.location.x - MAP_PIN_WIDTH / 2;
    var yPosition = element.location.y - MAP_PIN_HEIGHT;

    mapPinChild.setAttribute('style', 'left:' + xPosition + 'px; top:' + yPosition + 'px');
    mapPinChild.setAttribute('id', index);
    mapPinChildImg.setAttribute('src', element.author.avatar);
    return mapPinChild;
  }

  function onMapPinsEnterPress(evt) {
    if (window.utils.isEnterKeyPress(evt)) {
      window.card.onPopupOpen(evt);
    }
  }

  function removePins() {
    while (window.map.pinsContainer.children[2]) {
      window.map.pinsContainer.removeChild(window.map.pinsContainer.children[2]);
    }
  }

  function renderMapPins(ads) {
    window.map.pinsContainer.appendChild(window.utils.fillFragmentWith(ads, createMapPin));
  }

  window.pin = {
    MAP_PIN_WIDTH: MAP_PIN_WIDTH,
    MAP_PIN_HEIGHT: MAP_PIN_HEIGHT,
    renderMapPins: renderMapPins,
    onMapPinsEnterPress: onMapPinsEnterPress,
    removePins: removePins
  };
})();
