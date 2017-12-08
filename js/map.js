'use strict';


var ROOMS_PRICE_MIN = {
  bungalo: '0',
  flat: '1000',
  house: '5000',
  palace: '10000'
};
var PIN_COUNT = 8;
var similarArray = window.data.createSimilarArray(PIN_COUNT);
var mapCardTemplate = document.querySelector('template').content;
var beforeElement = document.querySelector('.map__filters-container');
var mapCardElement = mapCardTemplate.querySelector('.map__card').cloneNode(true);
var mapPin = mapCardTemplate.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var notice = document.querySelector('.notice');
var mapPinMain = map.querySelector('.map__pin--main');

var typeInput = notice.querySelector('#type');
var selectTimeIn = notice.querySelector('#timein');
var selectTimeOut = notice.querySelector('#timeout');
var selectRoomNumber = notice.querySelector('#room_number');
var selectCapacity = notice.querySelector('#capacity');
var fieldsCapacity = selectCapacity.querySelectorAll('option');



function renderMapPins(array) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(createMapPin(i));
  }
  mapPins.appendChild(fragment);
}
// card
function generateFeatures(features) {
  var cardListFragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    var newLiElement = document.createElement('li');
    newLiElement.className = 'feature feature--' + features[i];
    cardListFragment.appendChild(newLiElement);
  }
  return cardListFragment;
}

function renderFeatures(arrayFeatures) {
  var mapUlElement = mapCardElement.querySelector('.popup__features');
  mapUlElement.innerHTML = '';
  mapUlElement.appendChild(generateFeatures(arrayFeatures));
}

function generateCard(card) {
  var mapTextElements = mapCardElement.querySelectorAll('p');

  mapCardElement.querySelector('h3').textContent = card.offer.title;
  mapCardElement.querySelector('small').textContent = card.offer.address;
  mapCardElement.querySelector('.popup__price').textContent = card.offer.price + '/ночь';
  mapCardElement.querySelector('h4').textContent = card.offer.type;
  mapTextElements[2].textContent = card.offer.rooms + ' для ' + card.offer.guests + (card.offer.guests === 1 ? ' гостя' : ' гостей');
  mapTextElements[3].textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  mapCardElement.querySelector('h4').textContent = card.offer.type;
  renderFeatures(card.offer.features);
  mapTextElements[4].textContent = card.offer.description;
  mapCardElement.querySelector('.popup__avatar').setAttribute('src', card.author.avatar);
  map.insertBefore(mapCardElement, beforeElement);
}
// module4-task1

function disableForm() {
  var elements = notice.querySelectorAll('fieldset');
  mapPinMain.addEventListener('mouseup', onMainPinClick);
  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute('disabled', 'disabled');
  }
}

function enableForm() {
  var elements = notice.querySelectorAll('fieldset');
  mapPinMain.addEventListener('mouseup', onMainPinClick);
  for (var i = 0; i < elements.length; i++) {
    elements[i].removeAttribute('disabled');
  }
}

function onMainPinClick(event) {
  map.classList.remove('map--faded');
  notice.querySelector('.notice__form').classList.remove('notice__form--disabled');
  enableForm();
  renderMapPins(similarArray);
  mapPinMain.removeEventListener('mouseup', onMainPinClick);
  mapPins.addEventListener('mouseup', onPopupOpen);
  mapPins.addEventListener('keydown', onMapPinsEnterPress);
  typeInput.addEventListener('change', selectTypeInput);
  selectTimeIn.addEventListener('change', onSelectTimeIn);
  selectTimeOut.addEventListener('change', onSelectTimeOut);
  selectRoomNumber.addEventListener('change', onSelectRoomNumber);
  completeAddress(event);
  changeField(selectCapacity, 1);
  disableOptions(fieldsCapacity);
  enableOptions(fieldsCapacity, 1);
}

function hasClass(element, className) {
  if (element) {
    return element.classList.contains(className);
  } else {
    return false;
  }
}

function getTargetElement(event) {
  if (hasClass(event.target.parentElement, 'map__pin')) {
    return event.target.parentElement;
  }
  return hasClass(event.target, 'map__pin') ? event.target : false;
}

function onPopupOpen(event) {
  var mapPinTarget = getTargetElement(event);

  if (hasClass(mapPinTarget, 'map__pin--main')) {
    return;
  }

  if (mapPinTarget) {
    if (mapPinActive) {
      removeClass(mapPinActive, 'map__pin--active');
    }
    generateCard(similarArray[mapPinTarget.id]);
    mapPinTarget.classList.add('map__pin--active');
    mapPinActive = mapPinTarget;
    popupClose = map.querySelector('.popup__close');
    popupClose.addEventListener('mouseup', onPopupClose);
    map.addEventListener('keydown', onPopupEscPress);
    popupClose.addEventListener('keydown', onPopupCloseEnterPress);
  }
}



// task2

function selectTypeInput(evt) {
  var priceInput = notice.querySelector('#price');

  priceInput.setAttribute('min', ROOMS_PRICE_MIN[evt.target.value]);
}

function completeAddress(event) {
  var inputAdress = notice.querySelector('#address');
  var x = event.pageX - MAP_PIN_WIDTH / 2;
  var y = event.pageY - MAP_PIN_HEIGHT;
  inputAdress.setAttribute('value', x + ' ' + y);
}

function changeField(element, value) {
  element.value = value;
}

function onSelectTimeIn(event) {
  changeField(selectTimeOut, event.target.value);
}

function onSelectTimeOut(event) {
  changeField(selectTimeIn, event.target.value);
}

function onSelectRoomNumber(event) {
  var guestValue = event.target.value < 100 ? event.target.value : 0;
  changeField(selectCapacity, guestValue);
  disableOptions(fieldsCapacity);
  enableOptions(fieldsCapacity, guestValue);
}

function disableOptions(array) {
  for (var i = 0; i < array.length; i++) {
    array[i].setAttribute('disabled', 'disabled');
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

disableForm();
