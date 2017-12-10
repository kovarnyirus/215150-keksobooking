'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var popupClose;
  var mapPinActive;
  var beforeElement = document.querySelector('.map__filters-container');
  var mapCardTemplate = document.querySelector('template').content;
  var mapCardElement = mapCardTemplate.querySelector('.map__card').cloneNode(true);

  function renderCard(card) {
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
    window.map.map.insertBefore(mapCardElement, beforeElement);
  }

  function onPopupCloseEnterPress(evt) {
    if (evt.keyCode === window.pin.ENTER_KEYCODE) {
      onPopupClose();
    }
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

  function onPopupClose() {
    var popup = window.map.map.querySelector('.popup');
    popup.remove();
    window.utils.removeClass(mapPinActive, 'map__pin--active');
    window.map.map.removeEventListener('keydown', onPopupEscPress);
    popupClose.removeEventListener('keydown', onPopupCloseEnterPress);
  }

  function onPopupEscPress(event) {
    if (event.keyCode === window.card.ESC_KEYCODE) {
      onPopupClose();
      window.map.map.removeEventListener('keydown', onPopupEscPress);
    }
  }

  function renderFeatures(arrayFeatures) {
    var mapUlElement = mapCardElement.querySelector('.popup__features');
    mapUlElement.innerHTML = '';
    mapUlElement.appendChild(generateFeatures(arrayFeatures));
  }

  function onPopupOpen(event) {
    var mapPinTarget = window.utils.getTargetElement(event, 'map__pin');

    if (window.utils.hasClass(mapPinTarget, 'map__pin--main')) {
      return;
    }

    if (mapPinTarget) {
      if (mapPinActive) {
        window.utils.removeClass(mapPinActive, 'map__pin--active');
      }
      renderCard(window.data.similarArray[mapPinTarget.id]);
      window.utils.addClass(mapPinTarget, 'map__pin--active');
      mapPinActive = mapPinTarget;
      popupClose = window.map.map.querySelector('.popup__close');
      popupClose.addEventListener('mouseup', onPopupClose);
      window.map.map.addEventListener('keydown', onPopupEscPress);
      popupClose.addEventListener('keydown', onPopupCloseEnterPress);
    }
  }


  window.card = {
    ESC_KEYCODE: ESC_KEYCODE,
    mapCardTemplate: mapCardTemplate,
    onPopupOpen: onPopupOpen
  };
})();
