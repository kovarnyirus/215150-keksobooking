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
var AVATAR_LIST = ['01', '02', '03', '04', '05', '06', '07', '08'];
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
var TYPE_LIST = ['flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var similarObj = {};
var similarArray = [];
var getRandomItemArey = getRandomCelValue(1, 8);

function getRandomCelValue(minValue, maxValue) {
  return Math.round(Math.random() * (maxValue - minValue) + minValue);
}

map.classList.remove('map--faded');

function createSimilarArray() {
  for (var i = 0; i < 8; i++) {
    var x = getRandomCelValue(MIN_X, MAX_X);
    var y = getRandomCelValue(MIN_Y, MAX_Y);

    similarObj = {
      author: {
        avatar: 'img/avatars/user' + AVATAR_LIST.pop() + '.png'
      },
      offer: {
        title: TITLE_LIST.pop(),
        address: x + ',' + y,
        price: getRandomCelValue(MIN_PRICE, MAX_PRICE),
        type: TYPE_LIST.pop(),
        rooms: getRandomCelValue(MIN_ROOM, MAX_ROOM),
        guests: getRandomCelValue(MIN_GUEST, MAX_GUEST),
        checkin: CHECKIN[getRandomCelValue(1, 3)],
        checkout: CHECKOUT[getRandomCelValue(1, 3)],
        features: FEATURES_LIST.pop(),
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
// function createSimilarObj() {
//   similarObj.push({
//     author: {
//       avatar: 'img/avatars/user' + AVATAR_LIST.pop() + '.png'
//     },
//     offer: {
//       title: TITLE_LIST.pop(),
//       // address: x + ',' + y,
//       price: getRandomCelValue(MIN_PRICE, MAX_PRICE),
//       type: TYPE_LIST.pop(),
//       rooms: getRandomCelValue(MIN_ROOM, MAX_ROOM),
//       guests: getRandomCelValue(MIN_GUEST, MAX_GUEST),
//       checkin: CHECKIN.pop(),
//       checkout: CHECKOUT.pop(),
//       features: FEATURES_LIST.pop(),
//       description: ' ',
//       photos: []
//     },
//     location: {
//       x: getRandomCelValue(MIN_X, MAX_X),
//       y: getRandomCelValue(MIN_Y, MAX_Y)
//     }
//   }
//   );
// }

