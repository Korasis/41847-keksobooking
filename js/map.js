'use strict';

var ITEMS_COUNT = 8; // константа для количества объявлений

var MIN_LOCATION_X = 300;
var MAX_LOCATION_X = 900;
var MIN_LOCATION_Y = 150;
var MAX_LOCATION_Y = 500;

var PIN_SIZE = {
  draggableRoundPin: 65,
  draggableArrow: 22,
  userPinWidth: 50,
  userPinHeight: 70
};

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

var typeList = {
  flat: {
    ru: 'Квартира'
  },
  house: {
    ru: 'Дом'
  },
  bungalo: {
    ru: 'Бунгало'
  }
};

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
var randomTypes = [];
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
  randomTypes = Object.keys(typeList);
  typesCount = randomTypes.length;
  var randomType = '';
  for (var i = 0; i < count; i++) {
    var x = getRandomInt(MIN_LOCATION_X, MAX_LOCATION_X);
    var y = getRandomInt(MIN_LOCATION_Y, MAX_LOCATION_Y);
    var j = randomTitleIndex[i];
    randomTitle[i] = titleList[j - 1];
    randomType = randomTypes[getRandomInt(0, typesCount - 1)];
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
        'type': typeList[randomType].ru,
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

var generatePins = function (bookingItem) {
  var mapPinTemplate = document.querySelector('template').content;
  var mapPinElement = mapPinTemplate.querySelector('.map__pin').cloneNode(true);

  mapPinElement.style.left = (bookingItem.location.x - Math.floor(PIN_SIZE.userPinWidth * 0.5)) + 'px';
  mapPinElement.style.top = (bookingItem.location.y - PIN_SIZE.userPinHeight) + 'px';

  mapPinElement.querySelector('img').src = bookingItem.author.avatar;

  mapPinElement.onclick = function () {
    if (mapPins.querySelector('.popup')) {
      mapPins.removeChild(mapPins.querySelector('.popup'));
    }
    renderBookingItem(bookingItem);
  };

  return mapPinElement;
};

function renderPins() {
  var fragment = document.createDocumentFragment();

  bookingItems.forEach(function (item) {
    fragment.appendChild(generatePins(item));
  });

  mapPinsListElement.appendChild(fragment);
}

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
    featureElement.querySelectorAll('li')[i].classList.add('feature','feature--' + feature);
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

function disableFormElements() {
  fieldsetArray.forEach(function (fieldsetElement) {
    fieldsetElement.disabled = true;
  });
}

function enableFormElements() {
  formElement.classList.remove('notice__form--disabled');
  fieldsetArray.forEach(function (fieldsetElement) {
    fieldsetElement.disabled = false;
  });
}

function showMap() {
  mapPins.classList.remove('map--faded');
}

function getAddress() {
  var addressX = 0;
  var addressY = 0;

  if (mapPins.classList.contains('.map--faded')) {
    addressX = Math.floor(pinButton.offsetLeft + 0.5 * PIN_SIZE.draggableRoundPin);
    addressY = Math.floor(pinButton.offsetTop + 0.5 * PIN_SIZE.draggableRoundPin);
  } else {
    addressX = Math.floor(pinButton.offsetLeft + 0.5 * PIN_SIZE.draggableRoundPin);
    addressY = pinButton.offsetTop + PIN_SIZE.draggableArrow;
  }

  return addressX + ', ' + addressY;
}

function setAddress() {
  var address = getAddress();
  document.querySelector('#address').value = address;
}

generateBookingItems(ITEMS_COUNT);
setAddress();

var pinButtonMouseupHandler = function () {
  enableFormElements();
  showMap();
  setAddress();
  renderPins();
};

if (document.querySelector('.notice__form--disabled')) {
  disableFormElements();
}

pinButton.addEventListener('mouseup', pinButtonMouseupHandler);
