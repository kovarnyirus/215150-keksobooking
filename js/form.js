'use strict';
(function () {
  var ROOMS_PRICE_MIN = ['0', '1000', '5000', '10000'];
  var ROOM_TYPES_LIST = ['bungalo', 'flat', 'house', 'palace'];
  var TIMES_LIST = ['12:00', '13:00', '14:00'];
  var ROOMS_NUMBERS = ['1', '2', '3', '100'];
  var GUESTS_NUMBERS = ['1', '2', '3', '0'];
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var form = document.querySelector('.notice__form');
  var notice = document.querySelector('.notice');
  var typeInput = notice.querySelector('#type');
  var selectTimeIn = notice.querySelector('#timein');
  var selectTimeOut = notice.querySelector('#timeout');
  var selectRoomNumber = notice.querySelector('#room_number');
  var selectCapacity = notice.querySelector('#capacity');
  var capacityOptions = selectCapacity.querySelectorAll('option');
  var priceInput = notice.querySelector('#price');
  var avatarChooser = form.querySelector('#avatar');
  var photoContainer = form.querySelector('.form__photo-container');
  var imageChooser = form.querySelector('#images');
  var avatarPreview = form.querySelector('.notice__preview').querySelector('img');
  var fieldsetItems = notice.querySelectorAll('fieldset');
  var inputAdress = notice.querySelector('#address');

  function disableForm() {
    window.map.mainPin.addEventListener('mouseup', window.map.onMainPinClick);
    window.utils.disableElements(fieldsetItems);
    avatarChooser.addEventListener('change', onAvatar);
    imageChooser.addEventListener('change', onPhotosHouse);
  }

  function enableCapacityField(numberGuests, roomNum) {
    if (roomNum) {
      for (var i = 0; i < numberGuests.length - 1; i++) {
        if (capacityOptions[i].value <= roomNum) {
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

  function setAddress(evt, elementWidth, elementHeight) {
    var x = evt.pageX + elementWidth / 2;
    var y = evt.pageY + elementHeight;
    inputAdress.value = 'x: ' + x + ' y: ' + y;
  }

  function syncFieldRooms(element, value) {
    window.utils.setFieldValue(element, value);
    window.utils.disableElements(capacityOptions);
    enableCapacityField(capacityOptions, value === '0' ? false : value);
  }


  function syncPriceFields(element, value) {
    element.setAttribute('min', value);
  }

  function runForm(evt) {
    window.utils.enableElements();
    typeInput.addEventListener('change', onSelectTypeInput);
    selectTimeIn.addEventListener('change', onSelectTimeIn);
    selectTimeOut.addEventListener('change', onSelectTimeOut);
    selectRoomNumber.addEventListener('change', onSelectRoomNumber);
    window.utils.setFieldValue(selectCapacity, 1);
    window.utils.disableElements(capacityOptions);
    enableCapacityField(capacityOptions, 1);
    setAddress(evt, window.pin.MAP_PIN_WIDTH, window.pin.MAP_PIN_HEIGHT);
  }

  function onSubmitSuccess() {
    form.reset();
  }

  function onSubmit(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onSubmitSuccess, window.backend.onLoadError);

  }

  function onRenderPhoto(evt, cb) {
    var file = evt.srcElement.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });
    cb(matches, file);
  }

  function photoAvatar(matches, file) {
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  }

  function photosHouse(matches, file) {
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', onRenderHousesPhoto);
      reader.readAsDataURL(file);
    }
  }

  function onAvatar(evt) {
    onRenderPhoto(evt, photoAvatar);
  }

  function onPhotosHouse(evt) {
    onRenderPhoto(evt, photosHouse);
  }

  function onRenderHousesPhoto(evt) {
    var readerResult = evt.target.result;
    var photoWrapper = form.querySelector('.house-photo-wrapper');
    if (!photoWrapper) {
      var housePhotoWrapper = document.createElement('div');
      housePhotoWrapper.setAttribute('class', 'house-photo-wrapper');
      housePhotoWrapper.setAttribute('style', 'display: flex; flex-direction: row;');
      addPreviewPhoto(readerResult, housePhotoWrapper);
      photoContainer.appendChild(housePhotoWrapper);
    } else {
      addPreviewPhoto(readerResult, photoWrapper);
    }
  }

  function addPreviewPhoto(readerResult, parent) {
    var newImg = document.createElement('img');
    newImg.setAttribute('style', 'width: 100px; height: 100px; padding: 5px;');
    newImg.setAttribute('src', readerResult);
    parent.appendChild(newImg);
  }

  window.form = {
    fieldsetItems: fieldsetItems,
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
