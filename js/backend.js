'use strict';
(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';

  function setup(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('ошибка ' + xhr.status);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 1500;
    return xhr;
  }

  function onLoadError(errorMessage) {
    var node = document.createElement('div');

    node.style.border = '1px solid';
    node.style.textAlign = 'center';
    node.style.width = '40%';
    node.style.padding = '20';
    node.style.zIndex = '100';
    node.style.position = 'fixed';
    node.style.color = '#3a000b';
    node.style.background = '#cccccc';
    node.style.fontSize = '26px';
    node.textContent = errorMessage;
    node.setAttribute('class', 'error-message');
    document.body.insertAdjacentElement('afterbegin', node);
    setTimeout(function () {
      var Message = document.querySelector('.error-message');
      document.body.removeChild(Message);
    }, 5000);
  }

  function onLoadSuccess(ads) {
    window.data.sourceAdsData = ads;
    window.data.filteredAds = ads.slice(window.pin.MIN_PIN_COUNT, window.map.MAX_PIN_COUN);
    window.pin.renderMapPins(window.data.filteredAds);
  }

  window.backend = {
    save: function (data, onSuccess, onError) {
      var xhr = setup(onSuccess, onError);
      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },
    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },
    onLoadSuccess: onLoadSuccess,
    onLoadError: onLoadError
  };
})();
