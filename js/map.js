'use strict';
(function () {
  var MAIN_MAP_PIN_WIDTH = 62;
  var MAIN_MAP_PIN_HEIGHT = 87;
  var MIN_X = 50;
  var MAX_X = 1150;
  var MIN_Y = 124;
  var MAX_Y = 650;
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mainPinLastCoords;

  function onMainPinClick(event) {
    map.classList.remove('map--faded');
    window.form.notice.querySelector('.notice__form').classList.remove('notice__form--disabled');
    window.backend.load(ptsconsole, window.backend.errorHandler);
    // window.backend.load(window.pin.renderMapPins, window.backend.errorHandler);
    mapPinMain.removeEventListener('mouseup', onMainPinClick);
    mapPins.addEventListener('mouseup', window.card.onPopupOpen);
    mapPins.addEventListener('keydown', window.pin.onMapPinsEnterPress);
    window.form.runForm(event);
    mapPinMain.addEventListener('mousedown', mapPinMainMove);
    window.form.notice.addEventListener('submit', window.form.onSubmit);
  }

  function ptsconsole(evtee) {
    console.log(evtee);
  }

  function mapPinMainMove(event) {
    event.preventDefault();
    setMainPinLastCoords(event);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function setMainPinLastCoords(event) {
    mainPinLastCoords = {
      x: event.clientX,
      y: event.clientY
    };
  }

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: mainPinLastCoords.x - moveEvt.clientX,
      y: mainPinLastCoords.y - moveEvt.clientY
    };
    var mapPinMainOffsetLeft = mapPinMain.offsetLeft - shift.x;
    var mapPinMainOffsetTop = mapPinMain.offsetTop - shift.y;
    setMainPinLastCoords(moveEvt);

    if (mapPinMainOffsetTop >= MIN_Y && mapPinMainOffsetTop <= MAX_Y) {
      mapPinMain.style.top = mapPinMainOffsetTop + 'px';
    }
    if (mapPinMainOffsetLeft >= MIN_X && mapPinMainOffsetLeft <= MAX_X) {
      mapPinMain.style.left = mapPinMainOffsetLeft + 'px';
    }
    window.form.setAddress(moveEvt, MAIN_MAP_PIN_WIDTH, MAIN_MAP_PIN_HEIGHT);


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
    mapPins: mapPins,
    mapPinMainMove: mapPinMainMove
  };

})();
window.form.disableForm();

