'use strict';

var map = document.querySelector('.map');
var TITLE_LIST = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOM = 1;
var MAX_ROOM = 5;
var MIN_GUEST = 1;
var MAX_GUEST = 10;
var MIN_X = 300;
var MAX_X = 900;
var MIN_Y = 197;
var MAX_Y = 500;
var MAP_PIN_WIDTH = 45;
var MAP_PIN_HEIGHT = 62;
var PIN_COUNT = 8;
var TYPE_LIST = ['flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var similarArray = createSimilarArray(PIN_COUNT);
var mapCardTemplate = document.querySelector('template').content;
var beforeElement = document.querySelector('.map__filters-container');
var mapCardElement = mapCardTemplate.querySelector('.map__card').cloneNode(true);
var mapPin = mapCardTemplate.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');


function getRandomBetween(minValue, maxValue) {
  return Math.round(Math.random() * (maxValue - minValue) + minValue);
}

function cloneArray(array) {
  return array.concat();
}

function getRandomArrayItems(array, items) {
  var copyArray = cloneArray(array);
  var newArray = [];
  copyArray.sort(compareRandom);
  for (var i = 0; i < items; i++) {
    newArray.push(array[i]);
  }
  return newArray;
}

function compareRandom() {
  return Math.random() - 0.5;
}

function createSimilarArray(lengthArray) {
  var array = [];
  var similarObj = {};

  for (var i = 0; i < lengthArray; i++) {
    var x = getRandomBetween(MIN_X, MAX_X);
    var y = getRandomBetween(MIN_Y, MAX_Y);

    similarObj = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: TITLE_LIST.pop(),
        address: x + ',' + y,
        price: getRandomBetween(MIN_PRICE, MAX_PRICE),
        type: TYPE_LIST[getRandomBetween(1, 3)],
        rooms: getRandomBetween(MIN_ROOM, MAX_ROOM),
        guests: getRandomBetween(MIN_GUEST, MAX_GUEST),
        checkin: CHECKIN[getRandomBetween(0, 2)],
        checkout: CHECKOUT[getRandomBetween(0, 2)],
        features: getRandomArrayItems(FEATURES_LIST, 3),
        description: ' ',
        photos: []
      },
      location: {
        x: x,
        y: y
      }
    };
    array.push(similarObj);
  }
  return array;
}

function createMapPin(index) {
  var mapPinChild = mapPin.cloneNode(true);
  var mapPinChildImg = mapPinChild.querySelector('img');
  var xPosition = similarArray[index].location.x - MAP_PIN_WIDTH / 2;
  var yPosition = similarArray[index].location.y - MAP_PIN_HEIGHT;

  mapPinChild.setAttribute('style', 'left:' + xPosition + 'px; top:' + yPosition + 'px');
  mapPinChildImg.setAttribute('src', similarArray[index].author.avatar);
  return mapPinChild;
}

function renderMapPins(array) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(createMapPin(i));
  }
  mapPins.appendChild(fragment);
}

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
  mapTextElements[3].textContent = 'Заезд после ' + card.offer.checkin + ', выезд до' + card.offer.checkout;
  mapCardElement.querySelector('h4').textContent = card.offer.type;
  renderFeatures(card.offer.features);
  mapTextElements[4].textContent = card.offer.description;
  mapCardElement.querySelector('.popup__avatar').setAttribute('src', card.author.avatar);
  map.insertBefore(mapCardElement, beforeElement);
}

(function () {
  map.classList.remove('map--faded');
  renderMapPins(similarArray);
  generateCard(similarArray[0]);
}());
