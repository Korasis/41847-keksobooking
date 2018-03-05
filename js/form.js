'use strict';

(function () {
  var PIN_SIZE = {
    draggableRoundPin: 65,
    draggableArrow: 22,
    userPinWidth: 50,
    userPinHeight: 70
  };

  var ROOMS_CAPACITY = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

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

  var pinButton = document.querySelector('.map__pin--main');
  var fieldsetArray = document.querySelector('.notice__form').querySelectorAll('fieldset');
  var formElement = document.querySelector('.notice__form');
  var apartmentTypeElement = document.querySelector('#type');
  var priceElement = document.querySelector('#price');
  var checkInElement = document.querySelector('#timein');
  var checkOutElement = document.querySelector('#timeout');
  var roomsElement = document.querySelector('#room_number');
  var capacityElement = document.querySelector('#capacity');
  var descriptionElement = document.querySelector('#description');
  var reset = document.querySelector('.form__reset');

  function disableFormElements() {
    formElement.classList.add('notice__form--disabled');
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

  function clearForm() {
    var inputs = formElement.querySelectorAll('input');
    [].forEach.call(inputs, function (item) {
      if (item.type === 'checkbox') {
        item.checked = false;
      } else {
        item.value = '';
      }
    });
    descriptionElement.value = '';
    apartmentTypeElement.value = 'flat';
    checkInElement.value = '12:00';
    checkOutElement.value = '12:00';
    roomsElement.value = '1';
    capacityElement.value = '1';
  }

  function getAddress() {
    var addressX = 0;
    var addressY = 0;

    if (mapPins.classList.contains('map--faded')) {
      addressX = Math.floor(pinButton.offsetLeft + 0.5 * PIN_SIZE.draggableRoundPin);
      addressY = Math.floor(pinButton.offsetTop + 0.5 * PIN_SIZE.draggableRoundPin);
    } else {
      addressX = Math.floor(pinButton.offsetLeft + 0.5 * PIN_SIZE.draggableRoundPin);
      addressY = pinButton.offsetTop + PIN_SIZE.draggableRoundPin + PIN_SIZE.draggableArrow;
    }

    return 'X: ' + addressX + ', Y: ' + addressY;
  }

  function setAddress() {
    var address = getAddress();
    document.querySelector('#address').value = address;
  }

  var setMinPrice = function () {
    Object.keys(typeList).forEach(function (type) {
      if (apartmentTypeElement.value === type) {
        priceElement.setAttribute('min', typeList[type].minPrice);
      }
    });
  };

  function setTime(time1, time2) {
    time1.value = time2.value;
  }

  var setTimeOut = function () {
    setTime(checkOutElement, checkInElement);
  };

  var setTimeIn = function () {
    setTime(checkInElement, checkOutElement);
  };


  function roomsChangeHandler() {
    if (capacityElement.options.length > 0) {
      [].forEach.call(capacityElement.options, function (item) {
        item.selected = (ROOMS_CAPACITY[roomsElement.value][0] === item.value) ? true : false;
        item.disabled = (ROOMS_CAPACITY[roomsElement.value].indexOf(item.value) >= 0) ? false : true;
      });
    }
  }

  function resetForm() {
    disableFormElements();
    hideMap();
    resetPins();
    clearForm();
    setAddress();
  }

  apartmentTypeElement.addEventListener('change', setMinPrice);
  checkInElement.addEventListener('change', setTimeOut);
  checkOutElement.addEventListener('change', setTimeIn);
  roomsElement.addEventListener('change', roomsChangeHandler);
  reset.addEventListener('click', resetForm);

  setAddress();

  if (document.querySelector('.notice__form--disabled')) {
    disableFormElements();
  }

});
