'use strict';

var ITEMS_COUNT = 8; // константа для количества объявлений

var MIN_LOCATION_X = 300;
var MAX_LOCATION_X = 900;
var MIN_LOCATION_Y = 150;
var MAX_LOCATION_Y = 500;

var PIN_SIZE = 65;
var PIN_ARROW_HEIGHT = 22;

// элементы для отрисовки
var mapPins = document.querySelector('.map');
var mapPinsListElement = mapPins.querySelector('.map__pins');

var mapFiltersContainer = mapPins.querySelector('.map__filters-container');

// элементы формы
var fieldsetArray = document.querySelector('.notice__form').querySelectorAll('fieldset');
var formElement = document.querySelector('.notice__form');
var pinButton = document.querySelector('.map__pin--main');

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

// объявляем массивы, в которые будем генерить рандомные значения
var randomAvatar = [];
var randomTitle = [];
var randomPhotos = [];
var randomFeatures = [];

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

// рандомайзер индексов массивов - для аватарки и заголовка
function generateRandomIndex(count) {
  var j = 0;
  var tempArr = [];
  while (j < count) {
    var randomContentIndex = getRandomInt(1, count);

    if (tempArr.indexOf(randomContentIndex) < 0) {
      tempArr[j] = randomContentIndex;
      j++;
    }
  }

  return tempArr;
}

// рандомайзер массивов - для фич и фотографий
function getRandomArray(array, n) {
  var j = 0;
  var randomArray = [];
  while (j < n) {
    var randomArrayIndex = getRandomInt(0, array.length - 1);
    if (randomArray.indexOf(array[randomArrayIndex]) < 0) {
      randomArray[j] = array[randomArrayIndex];
      j++;
    }
  }
  return randomArray;
}

// заполняем сгенерированными данными массив объявлений
function generateBookingItems(count) {
  randomAvatar = generateRandomIndex(count);
  var randomTitleIndex = generateRandomIndex(titlesCount);


  for (var i = 0; i < count; i++) {
    var x = getRandomInt(MIN_LOCATION_X, MAX_LOCATION_X);
    var y = getRandomInt(MIN_LOCATION_Y, MAX_LOCATION_Y);
    var j = randomTitleIndex[i];
    randomTitle[i] = titleList[j - 1];
    randomFeatures = getRandomArray(featuresList, getRandomInt(1, featuresCount));
    randomPhotos = getRandomArray(photosList, photosCount);
    bookingItems[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + randomAvatar[i] + '.png'
      },
      'offer': {
        'title': randomTitle[i],
        'address': x + ', ' + y,
        'price': getRandomInt(MIN_PRICE, MAX_PRICE),
        'type': typeList[getRandomInt(0, typesCount - 1)],
        'rooms': getRandomInt(MIN_ROOMS, MAX_ROOMS),
        'guests': getRandomInt(MIN_GUESTS, MAX_GUESTS),
        'checkin': checkTimeList[getRandomInt(0, ckeckTimesCount - 1)],
        'checkout': checkTimeList[getRandomInt(0, ckeckTimesCount - 1)],
        'features': randomFeatures,
        'photos': randomPhotos
      },
      'location': {
        'x': x,
        'y': y
      }
    };

    randomFeatures = [];
    randomPhotos = [];
  }
}

var generatePins = function (bookingItem, index) {
  var mapPinTemplate = document.querySelector('template').content;
  var mapPinElement = mapPinTemplate.querySelector('.map__pin').cloneNode(true);
  var pinId = 'booking_item_' + index;

  mapPinElement.style.left = (bookingItem.location.x - 25) + 'px';
  mapPinElement.style.top = (bookingItem.location.y - 70) + 'px';

  mapPinElement.querySelector('img').setAttribute('src', bookingItem.author.avatar);
  mapPinElement.setAttribute('id', pinId);

  mapPinElement.onclick = function() {
    if (mapPins.querySelector('.map__card')) {
      mapPins.removeChild(mapPins.querySelector('.map__card'));
    }
    renderBookingItem(bookingItems[index]);
  }

  return mapPinElement;
};

function renderPins() {
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < bookingItems.length; j++) {
    fragment.appendChild(generatePins(bookingItems[j], j));
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

  for (var i = 0; i < content.offer.features.length; i++) {
    card.querySelector('.popup__features').appendChild(document.createElement('li'));
    if (!card.querySelectorAll('li')[i].hasAttribute('class')) {
      renderFeatureElement(tempFeatures[i], i);
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

  for (var j = 0; j < photosCount; j++) {
    card.querySelector('.popup__pictures').appendChild(document.createElement('li'));
    card.querySelector('.popup__pictures').querySelectorAll('li')[j].appendChild(document.createElement('img'));
    if (!card.querySelector('.popup__pictures').querySelectorAll('li')[j].querySelector('img').hasAttribute('src')) {
      renderPhotoElement(tempPhotos[j], j);
    }
  }

  return card;
}


function renderBookingItem(content) {
  mapPins.insertBefore(generateBookingItem(content), mapFiltersContainer);
}

function disableFormElements() {
  for (var i = 0; i < fieldsetArray.length; i++) {
      fieldsetArray[i].setAttribute('disabled', 'disabled');
  }
}

function enableFormElements() {
  formElement.classList.remove('notice__form--disabled');
  for (var i = 0; i < fieldsetArray.length; i++) {
      fieldsetArray[i].removeAttribute('disabled');
  }
}

function showMap() {
  mapPins.classList.remove('map--faded');
}

function getAddress() {
  var address = '';
  var addressX = 0;
  var addressY = 0;

  if (document.querySelector('.map--faded')){
    addressX = pinButton.offsetLeft + 0.5 * PIN_SIZE;
    addressY = pinButton.offsetTop + 0.5 * PIN_SIZE;
  } else {
    addressX = pinButton.offsetLeft + 0.5 * PIN_SIZE;
    addressY = pinButton.offsetTop + PIN_SIZE + PIN_ARROW_HEIGHT;
  }

  return address = addressX + ', ' + addressY;
}

function setAddress() {
  var address = getAddress();
  document.querySelector('#address').setAttribute('value', address);
}

generateBookingItems(ITEMS_COUNT);
setAddress();

var pinButtonMouseupHandler = function() {
  enableFormElements();
  showMap();
  setAddress();
  renderPins();
}

var showCard = function(index) {
  renderBookingItem(bookingItems[index]);
}

if (document.querySelector('.notice__form--disabled')) {
  disableFormElements();
}

pinButton.addEventListener ('mouseup', pinButtonMouseupHandler);
