'use strict';
(function () {
  var ROOMS_PRICE_MIN = ['0', '1000', '5000', '10000'];
  var ROOM_TYPES_LIST = ['bungalo', 'flat', 'house', 'palace'];
  var TIMES_LIST = ['12:00', '13:00', '14:00'];
  var ROOMS_NUMBERS = ['1', '2', '3', '100'];
  var GUESTS_NUMBERS = ['1', '2', '3', '0'];
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var FORM = document.querySelector('.notice__form');
  var notice = document.querySelector('.notice');
  var typeInput = notice.querySelector('#type');
  var selectTimeIn = notice.querySelector('#timein');
  var selectTimeOut = notice.querySelector('#timeout');
  var selectRoomNumber = notice.querySelector('#room_number');
  var selectCapacity = notice.querySelector('#capacity');
  var fieldsCapacity = selectCapacity.querySelectorAll('option');
  var priceInput = notice.querySelector('#price');
  var avatarChooser = FORM.querySelector('#avatar');
  var photoContainer = FORM.querySelector('.form__photo-container');
  var imageChooser = FORM.querySelector('#images');
  var avatarPreview = FORM.querySelector('.notice__preview').querySelector('img');

  function disableForm() {
    var elements = notice.querySelectorAll('fieldset');
    window.map.mapPinMain.addEventListener('mouseup', window.map.onMainPinClick);
    window.utils.disableElements(elements);
    avatarChooser.addEventListener('change', onAvatar);
    imageChooser.addEventListener('change', onPhotosHouse);
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

  function onSelectRoomNumber() {
    window.synchronizeFields(selectRoomNumber, selectCapacity, ROOMS_NUMBERS, GUESTS_NUMBERS, syncFieldRooms);
  }

  function onSelectTypeInput() {
    window.synchronizeFields(typeInput, priceInput, ROOM_TYPES_LIST, ROOMS_PRICE_MIN, syncPriceFields);
  }

  function onSelectTimeIn() {
    window.synchronizeFields(selectTimeIn, selectTimeOut, TIMES_LIST, TIMES_LIST, window.utils.setFieldValue);
  }

  function onSelectTimeOut() {
    window.synchronizeFields(selectTimeOut, selectTimeIn, TIMES_LIST, TIMES_LIST, window.utils.setFieldValue);
  }

  function setAddress(event, elementWidth, elementHeight) {
    var inputAdress = notice.querySelector('#address');
    var x = event.pageX + elementWidth / 2;
    var y = event.pageY + elementHeight;
    inputAdress.setAttribute('value', 'x: ' + x + ' y: ' + y);
  }

  function syncFieldRooms(element, value) {
    window.utils.setFieldValue(element, value);
    window.utils.disableElements(fieldsCapacity);
    if (value === '0') {
      enableCapacityField(fieldsCapacity, false);
    } else {
      enableCapacityField(fieldsCapacity, value);
    }
  }

  function syncPriceFields(element, value) {
    element.setAttribute('min', value);
  }

  function runForm(event) {
    window.utils.enableElements(notice, 'fieldset');
    typeInput.addEventListener('change', onSelectTypeInput);
    selectTimeIn.addEventListener('change', onSelectTimeIn);
    selectTimeOut.addEventListener('change', onSelectTimeOut);
    selectRoomNumber.addEventListener('change', onSelectRoomNumber);
    window.utils.setFieldValue(selectCapacity, 1);
    window.utils.disableElements(fieldsCapacity);
    enableCapacityField(fieldsCapacity, 1);
    setAddress(event, window.pin.MAP_PIN_WIDTH, window.pin.MAP_PIN_HEIGHT);
  }

  function onSubmitSuccess() {
    FORM.reset();
  }

  function onSubmit(event) {
    event.preventDefault();
    window.backend.save(new FormData(FORM), onSubmitSuccess, window.backend.onError);

  }

  function onAvatar(event) {
    var file = event.srcElement.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  }

  function onPhotosHouse(event) {
    var file = event.srcElement.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        var newImg = document.createElement('img');
        newImg.setAttribute('style', 'width: 100px; height: 100px; padding: 5px;');
        newImg.setAttribute('src', reader.result);
        photoContainer.appendChild(newImg);
      });
      reader.readAsDataURL(file);
    }
  }


  window.form = {
    runForm: runForm,
    notice: notice,
    setAddress: setAddress,
    disableForm: disableForm,
    onSubmit: onSubmit,
    onAvatar: onAvatar,
    onPhotosHouse: onPhotosHouse,
    imageChooser: imageChooser,
    avatarChooser: avatarChooser
  };

})();
