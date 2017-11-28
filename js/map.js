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
var MIN_Y = 100;
var MAX_Y = 500;
var MAP_PIN_WIDTH = 40;
var MAP_PIN_HEIGHT = 44;
var TYPE_LIST = ['flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var similarObj = {};
var similarArray = [];

function getRandomCelValue(minValue, maxValue) {
  return Math.round(Math.random() * (maxValue - minValue) + minValue);
}

function getRandomArray(array, items) {
  array.sort(compareRandom);
  var newArray = [];
  for (var i = 0; i < items; i++){
    newArray.push(array[i]);
  }
  return newArray;
}

function compareRandom() {
  return Math.random() - 0.5;
}

map.classList.remove('map--faded');

function createSimilarArray() {
  for (var i = 0; i < 8; i++) {
    var x = getRandomCelValue(MIN_X, MAX_X) + MAP_PIN_WIDTH / 2;
    var y = getRandomCelValue(MIN_Y, MAX_Y) + MAP_PIN_HEIGHT;

    similarObj = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title: TITLE_LIST.pop(),
        address: x + ',' + y,
        price: getRandomCelValue(MIN_PRICE, MAX_PRICE),
        type: TYPE_LIST[getRandomCelValue(1, 3)],
        rooms: getRandomCelValue(MIN_ROOM, MAX_ROOM),
        guests: getRandomCelValue(MIN_GUEST, MAX_GUEST),
        checkin: CHECKIN[getRandomCelValue(0, 2)],
        checkout: CHECKOUT[getRandomCelValue(0, 2)],
        features: getRandomArray(FEATURES_LIST, 3),
        description: ' ',
        photos: []
      },
      location: {
        x: x,
        y: y
      }
    };
    similarArray.push(similarObj);
  }
}
createSimilarArray();

console.log(similarArray);

var mapPin = document.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

function getMapPin(index) {
  var mapPinChild = mapPin.cloneNode(true);
  mapPinChild.setAttribute('style', 'left:' + similarArray[index].location.x + 'px; top:' + similarArray[index].location.y + 'px');
  return mapPinChild;
}

function renderMapPin() {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < similarArray.length; i++){
    fragment.appendChild(getMapPin(i));
    mapPins.appendChild(fragment);
  }

}

renderMapPin();

var mapCardTemplate = document.querySelector('template').content;
var beforeElement = document.querySelector('.map__filters-container');
var mapCardElement = mapCardTemplate.cloneNode(true);

function getFeatures(features) {
  var mapUlElement = mapCardElement.querySelector('.popup__features');
  var cardListFragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++){
    var newLiElement = document.createElement('li');
    newLiElement.className = 'feature feature--' + features[i];
    cardListFragment.appendChild(newLiElement);
  }
  mapUlElement.innerHTML = '';
  mapUlElement.appendChild(cardListFragment);
}

function getMapCard(card) {
  var mapTextElements = mapCardElement.querySelectorAll('p');

  mapCardElement.querySelector('h3').textContent = card.offer.title;
  mapCardElement.querySelector('small').textContent = card.offer.address;
  mapCardElement.querySelector('.popup__price').textContent = card.offer.price + '/ночь';
  mapCardElement.querySelector('h4').textContent = card.offer.type;
  mapTextElements[2].textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  mapTextElements[3].textContent = 'Заезд после '+ card.offer.checkin + ', выезд до' + card.offer.checkout;
  mapCardElement.querySelector('h4').textContent = card.offer.type;
  getFeatures(card.offer.features);
  mapTextElements[4].textContent = card.offer.description;
  mapCardElement.querySelector('.popup__avatar').setAttribute('src', card.author.avatar);

  map.insertBefore(mapCardElement, beforeElement);
}

getMapCard(similarObj);
