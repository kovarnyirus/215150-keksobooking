'use strict';
(function () {
  var MIN_MAP_PIN_WIDTH = 62;
  var MAIN_MAP_PIN_HEIGHT = 87;
  var MIN_X = 400;
  var MAX_X = 1500;
  var MIN_Y = 124;
  var MAX_Y = 625;
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
    mapPinMain.addEventListener('mousedown', mapPinMainMove);
  }




  function mapPinMainMove(event) {
    event.preventDefault();
    startCoords = {
      x: event.clientX,
      y: event.clientY
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  var startCoords;

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };
    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    if (startCoords.y >= MIN_Y && startCoords.y <= MAX_Y) {
      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
    }
    if (startCoords.x >= MIN_X && startCoords.x <= MAX_X) {
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
    }



    window.form.setAddress(moveEvt, MIN_MAP_PIN_WIDTH, MAIN_MAP_PIN_HEIGHT);

  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  window.map = {
    mapPinMain: mapPinMain,
    onMainPinClick: onMainPinClick,
    map: map,
    mapPins: mapPins
  };

})();
window.form.disableForm();

