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
        onError(xhr.response);
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

  function onErrorLoad(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 10px; font-size: 15px; text-align: center; background-color: rgba(169, 145, 145, .5); border-radius: 5px; padding: 10px;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.top = 0;
    node.style.fontSize = '15px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  function onSuccessLoad(ads) {
    window.data.sourceAdsData = ads;
    window.data.filteredAds = ads.slice(window.pin.MIN_PIN_COUNT, window.map.MAX_PIN_COUN);
    window.pin.renderMapPins(window.data.filteredAds);
  }

  window.backend = {
    save: function (data, onSuccess, error) {
      var xhr = setup(onSuccess, error);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },
    load: function (onLoad, error) {
      var xhr = setup(onLoad, error);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },
    onSuccessLoad: onSuccessLoad,
    onErrorLoad: onErrorLoad
  };
})();
