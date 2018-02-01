var apartments = []; //объявляем массив объявлений о квартирах

//массивы заданных значений
var titleList = [
  "Большая уютная квартира",
  "Маленькая неуютная квартира",
  "Огромный прекрасный дворец",
  "Маленький ужасный дворец",
  "Красивый гостевой домик",
  "Некрасивый негостеприимный домик",
  "Уютное бунгало далеко от моря",
  "Неуютное бунгало по колено в воде"
];

var featuresList = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner"
];

var typeList = [
  "flat",
  "house",
  "bungalo"
];

var photosList = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
];

var checkTimeList = [
  "12:00",
  "13:00",
  "14:00"
];


//объявляем массивы, в которые будем генерить рандомные значения
var randomAvatar = [];
var randomTitle = [];
var randomPhotos = [];
var randomFeatures = [];

//генерим пустой массив объектов для 8 объявлений
for (i = 0; i < 8; i++){
  apartments[i] = {
    "author": {},
    "offer": {
      "address": "{{location.x}}, {{location.y}}",
      "description": ""
    },
    "location": {}
  }
}

//рандомайзер в диапазоне
function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//генерим массив индексов для урл-ов аватаров
var i = 0;
while(i < 8){
  var randomAvatarIndex = getRandomInt(1,8);
  if(randomAvatar.indexOf(randomAvatarIndex) < 0){
    randomAvatar[i] = randomAvatarIndex;
  i++;
  }
}

//генерим массив уникальных заголовков
var j = 0;
while(j < 8){
  var randomTitleIndex = getRandomInt(0,7);
  if(randomTitle.indexOf(titleList[randomTitleIndex]) < 0){
    randomTitle[j] = titleList[randomTitleIndex];
  j++;
  }
}

function getPhotosArray(){
  var k = 0;
  while(k < 3){
    var randomPhotoIndex = getRandomInt(0,2);
    if(randomPhotos.indexOf(photosList[randomPhotoIndex]) < 0){
      randomPhotos[k] = photosList[randomPhotoIndex];
    k++;
    }
  }
  return randomPhotos;
}

function getFeaturesArray(n){
  var i = 0;
  while(i < n){
    var randomFeatureIndex = getRandomInt(0,5);
    if(randomFeatures.indexOf(featuresList[randomFeatureIndex]) < 0){
      randomFeatures[i] = featuresList[randomFeatureIndex];
    i++;
    }
  }
  return randomFeatures;
}

//заполняем сгенерированными данными массив объявлений
for(i = 0; i < 8; i++){
  apartments[i].author.avatar = "img/avatars/user0" + randomAvatar[i] + ".png";

  apartments[i].offer.title = randomTitle[i];
  apartments[i].offer.price = getRandomInt(1000,1000000);
  apartments[i].offer.type = typeList[getRandomInt(0,2)];
  apartments[i].offer.rooms = getRandomInt(1,5);
  apartments[i].offer.guests = getRandomInt(0,3);
  apartments[i].offer.checkin = checkTimeList[getRandomInt(0,2)];
  apartments[i].offer.checkout = checkTimeList[getRandomInt(0,2)];
  apartments[i].offer.features = getFeaturesArray(getRandomInt(1,6));
  randomFeatures = [];
  //debugger;
  apartments[i].offer.photos = getPhotosArray();
  randomPhotos = [];

  apartments[i].location.x = getRandomInt(300,900);
  apartments[i].location.y = getRandomInt(150,500);
}
