'use strict';

(function () {
  var ITEMS_COUNT = 8; // константа для количества объявлений

  var MIN_LOCATION_X = 300;
  var MAX_LOCATION_X = 900;
  var MIN_LOCATION_Y = 150;
  var MAX_LOCATION_Y = 500;

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
      ru: 'Квартира',
      minPrice: 1000
    },
    house: {
      ru: 'Дом',
      minPrice: 5000
    },
    bungalo: {
      ru: 'Лачуга',
      minPrice: 0
    },
    palace: {
      ru: 'Дворец',
      minPrice: 10000
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

  generateBookingItems(ITEMS_COUNT);


})
