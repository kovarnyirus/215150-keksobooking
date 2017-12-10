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
    window.utils.disableElements(elements);
  }


  function enableCapacityField(numberGuests, roomNum) {
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

  function onSelectRoomNumber(event) {
    var guestValue = event.target.value < 100 ? event.target.value : 0;
    window.utils.setFieldValue(selectCapacity, guestValue);
    window.utils.disableOptions(fieldsCapacity);
    enableCapacityField(fieldsCapacity, guestValue);
  }

  function onSelectTimeOut(event) {
    window.utils.setFieldValue(selectTimeIn, event.target.value);
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
    window.utils.setFieldValue(selectTimeOut, event.target.value);
  }

  function runForm(event) {
    window.utils.enableElements(notice, 'fieldset');
    typeInput.addEventListener('change', selectTypeInput);
    selectTimeIn.addEventListener('change', onSelectTimeIn);
    selectTimeOut.addEventListener('change', onSelectTimeOut);
    selectRoomNumber.addEventListener('change', onSelectRoomNumber);
    window.utils.setFieldValue(selectCapacity, 1);
    window.utils.disableOptions(fieldsCapacity);
    enableCapacityField(fieldsCapacity, 1);
    setAddress(event);
  }

  window.form = {
    runForm: runForm,
    notice: notice,
    disableForm: disableForm
  };

})();
