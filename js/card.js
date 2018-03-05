function generateBookingItem(content) {
  var cardTemplate = document.querySelector('template').content;
  var cardElement = cardTemplate.querySelector('article').cloneNode(true);

  cardElement.querySelector('img').src = content.author.avatar;
  cardElement.querySelector('h3').textContent = content.offer.title;
  cardElement.querySelector('p small').textContent = content.offer.address;
  cardElement.querySelector('.popup__price').innerHTML = content.offer.price + '&#x20bd;/ночь';

  cardElement.querySelector('h4').textContent = content.offer.type;

  cardElement.querySelector('h4 + p').textContent = content.offer.rooms + ' комнаты для ' + content.offer.guests + ' гостей';
  cardElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + content.offer.checkin + ', выезд до ' + content.offer.checkout;

  var tempFeatures = content.offer.features;
  var featureElement = cardElement.querySelector('.popup__features');
  featureElement.innerHTML = '';

  tempFeatures.forEach(function (feature, i) {
    featureElement.appendChild(document.createElement('li'));
    featureElement.querySelectorAll('li')[i].classList.add('feature', 'feature--' + feature);
  });

  cardElement.querySelector('.popup__features + p').textContent = content.offer.description;

  var photoElementSelector = cardElement.querySelector('.popup__pictures');
  photoElementSelector.removeChild(photoElementSelector.querySelector('li'));

  content.offer.photos.forEach(function (photo, i) {
    photoElementSelector.appendChild(document.createElement('li'));
    var photoElement = photoElementSelector.querySelectorAll('li')[i];
    photoElement.appendChild(document.createElement('img'));
    photoElement.querySelector('img').src = photo;
    photoElement.querySelector('img').height = 50;
    photoElement.querySelector('img').width = 70;
  });

  return cardElement;
}

function renderBookingItem(content) {
  mapPins.insertBefore(generateBookingItem(content), mapFiltersContainer);
}
