'use strict';

var ITEMS_COUNT = 8; // константа для количества объявлений
var bookingItems = []; // объявляем массив объявлений о квартирах

// массивы заданных значений
var titleList = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var titlesCount = titleList.length;

var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;

var typeList = [
  'flat',
  'house',
  'bungalo'
];

var typesCount = typeList.length;

var MIN_ROOMS = 1;
var MAX_ROOMS = 5;

var MIN_GUESTS = 0;
var MAX_GUESTS = 3;

var checkTimeList = [
  '12:00',
  '13:00',
  '14:00'
];

var ckeckTimesCount = checkTimeList.length;

var featuresList = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var featuresCount = featuresList.length;

var photosList = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var photosCount = photosList.length;

var MIN_LOCATION_X = 300;
var MAX_LOCATION_X = 900;
var MIN_LOCATION_Y = 150;
var MAX_LOCATION_Y = 500;

// объявляем массивы, в которые будем генерить рандомные значения
var randomAvatar = [];
var randomTitle = [];
var randomPhotos = [];
var randomFeatures = [];

// элементы для отрисовки
var mapPins = document.querySelector('.map');
var mapPinsListElement = mapPins.querySelector('.map__pins');
var mapFiltersContainer = mapPins.querySelector('.map__filters-container');

// генерим пустой массив объектов для объявлений
for (var k = 0; k < ITEMS_COUNT; k++) {
  bookingItems[k] = {
    'author': {},
    'offer': {},
    'location': {}
  };
}

// рандомайзер в диапазоне
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// генерим массив индексов для урл-ов аватаров
function generateAvatarsArray(count) {
  var j = 0;
  while (j < count) {
    var randomAvatarIndex = getRandomInt(1, count);
    if (randomAvatar.indexOf(randomAvatarIndex) < 0) {
      randomAvatar[j] = randomAvatarIndex;
      j++;
    }
  }
}

// генерим массив уникальных заголовков
function generateTitlesArray(count) {
  var j = 0;
  while (j < count) {
    var randomTitleIndex = getRandomInt(0, count - 1);
    if (randomTitle.indexOf(titleList[randomTitleIndex]) < 0) {
      randomTitle[j] = titleList[randomTitleIndex];
      j++;
    }
  }
}

// генерим массив фотографий объявления
function getPhotosArray() {
  var j = 0;
  while (j < photosCount) {
    var randomPhotoIndex = getRandomInt(0, photosCount - 1);
    if (randomPhotos.indexOf(photosList[randomPhotoIndex]) < 0) {
      randomPhotos[j] = photosList[randomPhotoIndex];
      j++;
    }
  }
  return randomPhotos;
}

// генерим массив фич квартиры
function getFeaturesArray(n) {
  var j = 0;
  while (j < n) {
    var randomFeatureIndex = getRandomInt(0, featuresCount - 1);
    if (randomFeatures.indexOf(featuresList[randomFeatureIndex]) < 0) {
      randomFeatures[j] = featuresList[randomFeatureIndex];
      j++;
    }
  }
  return randomFeatures;
}

// заполняем сгенерированными данными массив объявлений
function generateBookingItems(count) {
  generateAvatarsArray(count);
  generateTitlesArray(titlesCount);

  for (var i = 0; i < count; i++) {
    var offer = bookingItems[i].offer;
    var location = bookingItems[i].location;

    bookingItems[i].author.avatar = 'img/avatars/user0' + randomAvatar[i] + '.png';

    offer.title = randomTitle[i];

    location.x = getRandomInt(MIN_LOCATION_X, MAX_LOCATION_X);
    location.y = getRandomInt(MIN_LOCATION_Y, MAX_LOCATION_Y);

    offer.address = location.x + ', ' + location.y;

    offer.price = getRandomInt(MIN_PRICE, MAX_PRICE);
    offer.type = typeList[getRandomInt(0, typesCount - 1)];
    offer.rooms = getRandomInt(MIN_ROOMS, MAX_ROOMS);
    offer.guests = getRandomInt(MIN_GUESTS, MAX_GUESTS);
    offer.checkin = checkTimeList[getRandomInt(0, ckeckTimesCount - 1)];
    offer.checkout = checkTimeList[getRandomInt(0, ckeckTimesCount - 1)];
    offer.features = getFeaturesArray(getRandomInt(1, featuresCount));
    offer.photos = getPhotosArray();

    randomFeatures = [];
    randomPhotos = [];
  }
}

function showMap() {
  mapPins.classList.remove('map--faded');
}

var generatePins = function (bookingItem) {
  var mapPinTemplate = document.querySelector('template').content;
  var mapPinElement = mapPinTemplate.querySelector('.map__pin').cloneNode(true);

  mapPinElement.style.left = (bookingItem.location.x - 25) + 'px';
  mapPinElement.style.top = (bookingItem.location.y - 70) + 'px';

  mapPinElement.querySelector('img').setAttribute('src', bookingItem.author.avatar);

  return mapPinElement;
};

function renderPins() {
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < bookingItems.length; j++) {
    fragment.appendChild(generatePins(bookingItems[j]));
  }

  mapPinsListElement.appendChild(fragment);
}

function generateBookingItem(content) {
  var card = document.createElement('article');

  card.appendChild(document.createElement('img'));
  card.querySelector('img').setAttribute('src', content.author.avatar);

  card.setAttribute('class', 'map__card popup');

  card.appendChild(document.createElement('h3'));
  card.querySelector('h3').textContent = content.offer.title;

  card.appendChild(document.createElement('p'));
  card.querySelector('p').appendChild(document.createElement('small'));
  card.querySelector('p small').textContent = content.offer.address;

  card.appendChild(document.createElement('div'));
  card.querySelector('div').setAttribute('class', 'popup__price');
  card.querySelector('.popup__price').innerHTML = content.offer.price + '&#x20bd;/ночь';

  card.appendChild(document.createElement('h4'));
  if (content.offer.type === 'flat') {
    card.querySelector('h4').textContent = 'Квартира';
  } else if (content.offer.type === 'bungalo') {
    card.querySelector('h4').textContent = 'Бунгало';
  } else if (content.offer.type === 'house') {
    card.querySelector('h4').textContent = 'Дом';
  }

  card.appendChild(document.createElement('p'));
  card.querySelector('h4 + p').textContent = content.offer.rooms + ' комнаты для ' + content.offer.guests + ' гостей';

  card.appendChild(document.createElement('p'));
  card.querySelector('h4 + p + p').textContent = 'Заезд после ' + content.offer.checkin + ', выезд до ' + content.offer.checkout;

  card.appendChild(document.createElement('ul'));
  card.querySelector('ul').setAttribute('class', 'popup__features');

  var tempFeatures = content.offer.features;

  function renderFeatureElement(featureName, index) {
    if (tempFeatures.indexOf(featureName) >= 0) {
        card.querySelectorAll('li')[index].setAttribute('class', 'feature feature--' + featureName);
        var featureIndex = tempFeatures.indexOf(featureName);
        tempFeatures[featureIndex] = '';

      }
  }

  for (var j = 0; j < content.offer.features.length; j++) {
    card.querySelector('.popup__features').appendChild(document.createElement('li'));
    if (!card.querySelectorAll('li')[j].hasAttribute('class')) {
      renderFeatureElement(tempFeatures[j], j);
      continue;
    }
  }

  card.appendChild(document.createElement('p'));
  card.querySelector('.popup__features + p').textContent = content.offer.description;

  card.appendChild(document.createElement('ul'));
  card.querySelector('ul + p + ul').setAttribute('class', 'popup__pictures');

  var tempPhotos = content.offer.photos;

  function renderPhotoElement(photoSrc, index) {
    if (tempPhotos.indexOf(photoSrc) >= 0) {
        var photoElementSelector = card.querySelector('.popup__pictures');
        photoElementSelector.querySelectorAll('li')[index].querySelector('img').setAttribute('src', photoSrc);
        photoElementSelector.querySelectorAll('li')[index].querySelector('img').setAttribute('height', '30%');
        photoElementSelector.querySelectorAll('li')[index].querySelector('img').setAttribute('width', '30%');
        var photosIndex = tempPhotos.indexOf(photoSrc);
        tempPhotos[photosIndex] = '';

      }
  }

  for (var k = 0; k < photosCount; k++) {
    card.querySelector('.popup__pictures').appendChild(document.createElement('li'));
    card.querySelector('.popup__pictures').querySelectorAll('li')[k].appendChild(document.createElement('img'));
    if (!card.querySelector('.popup__pictures').querySelectorAll('li')[k].querySelector('img').hasAttribute('src')) {
      renderPhotoElement(tempPhotos[k], k);
      continue;
    }
  }

  return card;
}


function renderBookingItem(content) {
  mapPins.insertBefore(generateBookingItem(content), mapFiltersContainer);
}


generateBookingItems(ITEMS_COUNT);
showMap();
renderPins();
renderBookingItem(bookingItems[0]);
