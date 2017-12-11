'use strict';
(function () {
  var MAP_PIN_WIDTH = 45;
  var MAP_PIN_HEIGHT = 62;
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
    if (window.utils.isEnterKeyPress(event)) {
      window.card.onPopupOpen(event);
    }
  }

  function renderMapPins(elements) {
    window.map.mapPins.appendChild(fillFragmentElements(elements));
  }

  function fillFragmentElements(elements) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < elements.length; i++) {
      fragment.appendChild(createMapPin(i));
    }
    return fragment;
  }

  window.pin = {
    MAP_PIN_WIDTH: MAP_PIN_WIDTH,
    MAP_PIN_HEIGHT: MAP_PIN_HEIGHT,
    renderMapPins: renderMapPins,
    onMapPinsEnterPress: onMapPinsEnterPress
  };
})();
