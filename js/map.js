'use strict';
(function () {
  var MAIN_MAP_PIN_WIDTH = 62;
  var MAIN_MAP_PIN_HEIGHT = 87;
  var MIN_X = 50;
  var MAX_X = 1150;
  var MIN_Y = 124;
  var MAX_Y = 650;
  var MIN_PIN_COUNT = 0;
  var MAX_PIN_COUN = 5;
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;
  var map = document.querySelector('.map');
  var pinsContainer = document.querySelector('.map__pins');
  var mainPin = map.querySelector('.map__pin--main');
  var mainPinPosition;
  var mapFilters = map.querySelector('.map__filters');
  var checkedFeatures;
  var debouncer = window.utils.debounce(window.pin.renderMapPins, window.utils.DEBOUNCE_INTERVAL);
  var inputFeatures = mapFilters.querySelector('#housing-features').querySelectorAll('input');

  function onMainPinClick(evt) {
    map.classList.remove('map--faded');
    window.form.notice.querySelector('.notice__form').classList.remove('notice__form--disabled');
    window.backend.load(window.backend.onLoadSuccess, window.backend.onLoadError);
    mainPin.removeEventListener('mouseup', onMainPinClick);
    pinsContainer.addEventListener('mouseup', window.card.onPopupOpen);
    pinsContainer.addEventListener('keydown', window.pin.onMapPinsEnterPress);
    mapFilters.addEventListener('change', onFiltersClick);
    window.form.runForm(evt);
    mainPin.addEventListener('mousedown', mapPinMainMove);
    window.form.notice.addEventListener('submit', window.form.onSubmit);
    window.form.avatarChooser.addEventListener('change', window.form.onAvatar);
    window.form.imageChooser.addEventListener('change', window.form.onPhotosHouse);
  }

  function mapPinMainMove(evt) {
    evt.preventDefault();
    setMainPinLastCoords(evt);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function setMainPinLastCoords(evt) {
    mainPinPosition = {
      x: evt.clientX,
      y: evt.clientY
    };
  }

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: mainPinPosition.x - moveEvt.clientX,
      y: mainPinPosition.y - moveEvt.clientY
    };
    var mapPinMainOffsetLeft = mainPin.offsetLeft - shift.x;
    var mapPinMainOffsetTop = mainPin.offsetTop - shift.y;
    setMainPinLastCoords(moveEvt);

    if (isBetween(mapPinMainOffsetTop, MIN_Y, MAX_Y)) {
      mainPin.style.top = mapPinMainOffsetTop + 'px';
    }
    if (isBetween(mapPinMainOffsetLeft, MIN_X, MAX_X)) {
      mainPin.style.left = mapPinMainOffsetLeft + 'px';
    }
    window.form.setAddress(moveEvt, MAIN_MAP_PIN_WIDTH, MAIN_MAP_PIN_HEIGHT);
  }

  function isBetween(value, min, max) {
    return value >= min && value <= max;
  }

  function onMouseUp(evt) {
    evt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  function compareElements(element, value) {
    return value === 'any' || element === value;
  }

  function filterType(item) {
    var selectFilterType = mapFilters.querySelector('#housing-type').value;
    var elementValue = item.offer.type;
    return compareElements(elementValue, selectFilterType);
  }

  function filterRoomNum(item) {
    var selectFilterRoomNum = mapFilters.querySelector('#housing-rooms').value;
    var elementValue = item.offer.rooms;
    return compareElements(elementValue.toString(), selectFilterRoomNum);
  }

  function filterGuestNum(item) {
    var selectFilterGuestNum = mapFilters.querySelector('#housing-guests').value;
    var elementValue = item.offer.guests;
    return compareElements(elementValue.toString(), selectFilterGuestNum);
  }

  function filterPrice(item) {
    var selectFilterPrice = mapFilters.querySelector('#housing-price').value;
    var elementValue = item.offer.price;
    if (selectFilterPrice === 'any') {
      return true;
    } else if (elementValue < LOW_PRICE) {
      elementValue = 'low';
    } else if (isBetween(elementValue, LOW_PRICE, HIGH_PRICE)) {
      elementValue = 'middle';
    } else {
      elementValue = 'high';
    }
    return elementValue === selectFilterPrice;
  }

  function filterFeatures(item) {
    var elementFeature = item.offer.features;
    checkedFeatures = [].filter.call(inputFeatures, (function (element) {
      return element.checked;
    }));
    for (var k = 0; k < checkedFeatures.length; k++) {
      if (elementFeature.indexOf(checkedFeatures[k].value) === -1) {
        return false;
      }
    }
    return true;
  }

  function filterFields(item) {
    return filterType(item) && filterRoomNum(item) && filterGuestNum(item) && filterPrice(item) && filterFeatures(item);
  }

  function onFiltersClick() {
    window.data.filteredAds = window.data.sourceAdsData.filter(filterFields).slice(MIN_PIN_COUNT, MAX_PIN_COUN);
    window.card.onPopupClose();
    window.pin.removePins();
    debouncer(window.data.filteredAds);
  }

  window.map = {
    mainPin: mainPin,
    onMainPinClick: onMainPinClick,
    map: map,
    pinsContainer: pinsContainer,
    MIN_PIN_COUNT: MIN_PIN_COUNT,
    MAX_PIN_COUN: MAX_PIN_COUN
  };

})();
window.form.disableForm();

