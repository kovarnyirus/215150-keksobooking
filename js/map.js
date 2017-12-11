'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');

  function onMainPinClick(event) {
    map.classList.remove('map--faded');
    window.form.notice.querySelector('.notice__form').classList.remove('notice__form--disabled');
    window.pin.renderMapPins(window.data.similarArray);
    mapPinMain.removeEventListener('mouseup', onMainPinClick);
    mapPins.addEventListener('mouseup', window.card.onPopupOpen);
    mapPins.addEventListener('keydown', window.pin.onMapPinsEnterPress);
    window.form.runForm(event);
  }

  window.map = {
    mapPinMain: mapPinMain,
    onMainPinClick: onMainPinClick,
    map: map,
    mapPins: mapPins
  };

})();
window.form.disableForm();
