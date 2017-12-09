'use strict';
(function () {
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
  var MIN_X = 300;
  var MAX_X = 900;
  var MIN_Y = 197;
  var MAX_Y = 500;
  var MIN_ROOM = 1;
  var MAX_ROOM = 5;
  var MIN_GUEST = 1;
  var MAX_GUEST = 10;
  var TYPE_LIST = ['flat', 'house', 'bungalo'];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var PIN_COUNT = 8;
  var similarArray = createSimilarArray(PIN_COUNT);


  function cloneArray(array) {
    return array.concat();
  }

  function compareRandom() {
    return Math.random() - 0.5;
  }

  function getRandomBetween(minValue, maxValue) {
    return Math.round(Math.random() * (maxValue - minValue) + minValue);
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

  window.data = {
    similarArray: similarArray
  };
})();
