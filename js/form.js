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
    elements.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
  }

  function enableForm() {
    var elements = notice.querySelectorAll('fieldset');
    elements.forEach(function (item) {
      item.removeAttribute('disabled');
    });
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
    setFieldValue(selectCapacity, guestValue);
    disableOptions(fieldsCapacity);
    enableOptions(fieldsCapacity, guestValue);
  }

  function onSelectTimeOut(event) {
    setFieldValue(selectTimeIn, event.target.value);
  }

  function setFieldValue(element, value) {
    element.value = value;
  }

  function setAddress(event) {
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
    setFieldValue(selectTimeOut, event.target.value);
  }

  function runForm(event) {
    enableForm();
    typeInput.addEventListener('change', selectTypeInput);
    selectTimeIn.addEventListener('change', onSelectTimeIn);
    selectTimeOut.addEventListener('change', onSelectTimeOut);
    selectRoomNumber.addEventListener('change', onSelectRoomNumber);
    setFieldValue(selectCapacity, 1);
    disableOptions(fieldsCapacity);
    enableOptions(fieldsCapacity, 1);
    setAddress(event);
  }

  window.form = {
    runForm: runForm,
    notice: notice,
    disableForm: disableForm
  };

})();
