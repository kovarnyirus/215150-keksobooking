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
  var similarArray = createAdsArray(PIN_COUNT);

  function createAdsArray(lengthArray) {
    var array = [];
    var similarObj = {};
    var x;
    var y;

    for (var i = 0; i < lengthArray; i++) {
      x = window.utils.getRandomBetween(MIN_X, MAX_X);
      y = window.utils.getRandomBetween(MIN_Y, MAX_Y);
      similarObj = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: TITLE_LIST.pop(),
          address: x + ',' + y,
          price: window.utils.getRandomBetween(MIN_PRICE, MAX_PRICE),
          type: TYPE_LIST[window.utils.getRandomBetween(0, 2)],
          rooms: window.utils.getRandomBetween(MIN_ROOM, MAX_ROOM),
          guests: window.utils.getRandomBetween(MIN_GUEST, MAX_GUEST),
          checkin: CHECKIN[window.utils.getRandomBetween(0, 2)],
          checkout: CHECKOUT[window.utils.getRandomBetween(0, 2)],
          features: window.utils.getRandomArrayItems(FEATURES_LIST, 3),
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
    similarArray: similarArray,
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y
  };
})();
