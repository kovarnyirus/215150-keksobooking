'use strict';
(function () {
  window.showCard = function () {
    window.pin.renderMapPins(window.data.similarArray);
    window.map.mapPinMain.removeEventListener('mouseup', window.map.onMainPinClick);
    window.map.mapPins.addEventListener('mouseup', window.card.onPopupOpen);
    window.map.mapPins.addEventListener('keydown', window.pin.onMapPinsEnterPress);
  };
})();
