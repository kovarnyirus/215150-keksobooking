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
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mainPinLastCoords;
  var mapFilters = map.querySelector('.map__filters');
  var checkedFeatures;
  var debouncer = window.utils.debounce(window.pin.renderMapPins, window.utils.DEBOUNCE_INTERVAL);
  var inputFeatures = mapFilters.querySelector('#housing-features').querySelectorAll('input');

  function onMainPinClick(event) {
    map.classList.remove('map--faded');
    window.form.notice.querySelector('.notice__form').classList.remove('notice__form--disabled');
    window.backend.load(window.backend.successLoad, window.backend.onError);
    mapPinMain.removeEventListener('mouseup', onMainPinClick);
    mapPins.addEventListener('mouseup', window.card.onPopupOpen);
    mapPins.addEventListener('keydown', window.pin.onMapPinsEnterPress);
    mapFilters.addEventListener('click', onFiltersClick);
    window.form.runForm(event);
    mapPinMain.addEventListener('mousedown', mapPinMainMove);
    window.form.notice.addEventListener('submit', window.form.onSubmit);
    window.form.avatarChooser.addEventListener('change', window.form.onAvatar);
    window.form.imageChooser.addEventListener('change', window.form.onPhotosHouse);
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
    } else if (elementValue < 10000) {
      elementValue = 'low';
    } else if (elementValue >= 10000 && elementValue < 50000) {
      elementValue = 'middle';
    } else {
      elementValue = 'high';
    }

    return elementValue === selectFilterPrice;
  }

  function filterFeatures(item) {
    var array = [];
    var elementFeature = item.offer.features;
    for (var i = 0; i < inputFeatures.length; i++) {
      array.push(inputFeatures[i]);
    }

    checkedFeatures = array.filter(function (element) {
      if (element.checked) {
        return true;
      }
      return false;
    });

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
    var shortFilterArr;
    var filterArr = window.data.sourceAdsData.filter(filterFields);
    shortFilterArr = filterArr.slice(MIN_PIN_COUNT, MAX_PIN_COUN);
    window.data.cloneAdsData = shortFilterArr;
    window.pin.removePins();
    debouncer(shortFilterArr);

  }


  window.map = {
    mapPinMain: mapPinMain,
    onMainPinClick: onMainPinClick,
    map: map,
    mapPins: mapPins,
    MIN_PIN_COUNT: MIN_PIN_COUNT,
    MAX_PIN_COUN: MAX_PIN_COUN
  };

})();
window.form.disableForm();

