'use strict';
(function () {
  var ROOMS_PRICE_MIN = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };
  var notice = document.querySelector('.notice');
  var typeInput = notice.querySelector('#type');
  var selectTimeIn = notice.querySelector('#timein');
  var selectTimeOut = notice.querySelector('#timeout');
  var selectRoomNumber = notice.querySelector('#room_number');
  var selectCapacity = notice.querySelector('#capacity');
  var fieldsCapacity = selectCapacity.querySelectorAll('option');

  function disableForm() {
    var elements = notice.querySelectorAll('fieldset');
    window.map.mapPinMain.addEventListener('mouseup', window.map.onMainPinClick);
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', 'disabled');
    }
  }

  function enableForm() {
    var elements = notice.querySelectorAll('fieldset');
    window.map.mapPinMain.addEventListener('mouseup', window.map.onMainPinClick);
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }
  }

  function enableOptions(numberGuests, roomNum) {
    if (roomNum) {
      for (var i = 0; i < numberGuests.length - 1; i++) {
        if (fieldsCapacity[i].value <= roomNum) {
          numberGuests[i].removeAttribute('disabled');
        }
      }
    } else {
      numberGuests[3].removeAttribute('disabled');
    }
  }

  function disableOptions(array) {
    for (var i = 0; i < array.length; i++) {
      array[i].setAttribute('disabled', 'disabled');
    }
  }

  function onSelectRoomNumber(event) {
    var guestValue = event.target.value < 100 ? event.target.value : 0;
    changeField(selectCapacity, guestValue);
    disableOptions(fieldsCapacity);
    enableOptions(fieldsCapacity, guestValue);
  }

  function onSelectTimeOut(event) {
    changeField(selectTimeIn, event.target.value);
  }

  function changeField(element, value) {
    element.value = value;
  }

  function completeAddress(event) {
    var inputAdress = notice.querySelector('#address');
    var x = event.pageX - window.pin.MAP_PIN_WIDTH / 2;
    var y = event.pageY - window.pin.MAP_PIN_HEIGHT;
    inputAdress.setAttribute('value', x + ' ' + y);
  }

  function selectTypeInput(evt) {
    var priceInput = notice.querySelector('#price');

    priceInput.setAttribute('min', ROOMS_PRICE_MIN[evt.target.value]);
  }

  function onSelectTimeIn(event) {
    changeField(selectTimeOut, event.target.value);
  }

  function runForm(event) {
    enableForm();
    typeInput.addEventListener('change', selectTypeInput);
    selectTimeIn.addEventListener('change', onSelectTimeIn);
    selectTimeOut.addEventListener('change', onSelectTimeOut);
    selectRoomNumber.addEventListener('change', onSelectRoomNumber);
    changeField(selectCapacity, 1);
    disableOptions(fieldsCapacity);
    enableOptions(fieldsCapacity, 1);
    completeAddress(event);
  }

  window.form = {
    runForm: runForm,
    notice: notice,
    disableForm: disableForm
  };

})();
