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

function resetPins() {
  var pins = document.querySelectorAll('.map__pin');
  [].forEach.call(pins, function (item) {
    if (!item.classList.contains('map__pin--main')) {
      item.remove();
    }
  });
}

var pinButtonMouseupHandler = function () {
  enableFormElements();
  showMap();
  renderPins();
  setAddress();
};

pinButton.addEventListener('mouseup', pinButtonMouseupHandler);
