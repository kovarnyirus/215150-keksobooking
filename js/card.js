'use strict';
(function () {
  var popupClose;
  var mapPinActive;
  var beforeItem = document.querySelector('.map__filters-container');
  var mapCardTemplate = document.querySelector('template').content;
  var mapCardElement = mapCardTemplate.querySelector('.map__card').cloneNode(true);
  var popupPicture = mapCardElement.querySelector('.popup__pictures');
  var popupFeature = mapCardElement.querySelector('.popup__features');

  function renderCard(card) {
    var mapTextElements = mapCardElement.querySelectorAll('p');

    mapCardElement.querySelector('h3').textContent = card.offer.title;
    mapCardElement.querySelector('small').textContent = card.offer.address;
    mapCardElement.querySelector('.popup__price').textContent = card.offer.price + '/ночь';
    mapCardElement.querySelector('h4').textContent = card.offer.type;
    mapTextElements[2].textContent = card.offer.rooms + ' для ' + card.offer.guests + (card.offer.guests === 1 ? ' гостя' : ' гостей');
    mapTextElements[3].textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    mapCardElement.querySelector('h4').textContent = card.offer.type;
    renderCardElements(card.offer.features, popupFeature, generateFeatures);
    renderCardElements(card.offer.photos, popupPicture, generatePopupPictures);
    mapTextElements[4].textContent = card.offer.description;
    mapCardElement.querySelector('.popup__avatar').setAttribute('src', card.author.avatar);
    window.map.map.insertBefore(mapCardElement, beforeItem);
  }

  function onPopupCloseEnterPress(evt) {
    if (window.utils.isEnterKeyPress(evt)) {
      onPopupClose();
    }
  }

  function onPopupClose() {
    var popup = window.map.map.querySelector('.popup');
    if (popup) {
      popup.remove();
      window.utils.removeClass(mapPinActive, 'map__pin--active');
      window.map.map.removeEventListener('keydown', onPopupEscPress);
      popupClose.removeEventListener('keydown', onPopupCloseEnterPress);
    }
  }

  function onPopupEscPress(evt) {
    if (window.utils.isEscKeyPress(evt)) {
      onPopupClose();
      window.map.map.removeEventListener('keydown', onPopupEscPress);
    }
  }

  function renderCardElements(arrayElements, parent, callback) {
    parent.innerHTML = '';
    parent.appendChild(callback(arrayElements));
  }

  function generatePopupPictures(arrayElements) {
    var cardListFragment = document.createDocumentFragment();
    arrayElements.forEach(function (item) {
      var newLiElement = document.createElement('li');
      var newImg = document.createElement('img');
      newImg.setAttribute('src', item);
      newImg.setAttribute('style', 'width: 35px; height: 35px; padding: 5px;');
      newLiElement.appendChild(newImg);
      cardListFragment.appendChild(newLiElement);
    });
    return cardListFragment;
  }

  function generateFeatures(features) {
    var cardListFragment = document.createDocumentFragment();
    features.forEach(function (item) {
      var newLiElement = document.createElement('li');
      newLiElement.className = 'feature feature--' + item;
      cardListFragment.appendChild(newLiElement);
    });
    return cardListFragment;
  }

  function onPopupOpen(evt) {
    var mapPinTarget = window.utils.getTargetElement(evt, 'map__pin');

    if (!window.utils.hasClass(mapPinTarget, 'map__pin--main') && mapPinTarget) {
      if (mapPinActive) {
        window.utils.removeClass(mapPinActive, 'map__pin--active');
      }
      window.showCard(window.data.filteredAds[mapPinTarget.id]);
      window.utils.addClass(mapPinTarget, 'map__pin--active');
      mapPinActive = mapPinTarget;
      popupClose = window.map.map.querySelector('.popup__close');
      popupClose.addEventListener('mouseup', onPopupClose);
      window.map.map.addEventListener('keydown', onPopupEscPress);
      popupClose.addEventListener('keydown', onPopupCloseEnterPress);
    }
  }

  window.card = {
    mapCardTemplate: mapCardTemplate,
    onPopupOpen: onPopupOpen,
    renderCard: renderCard,
    onPopupClose: onPopupClose
  };
})();
