const gameDiv = document.querySelector(".game");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
document.querySelector(".score").textContent = score;

fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffleCards();
    generateCards();
  });

// search
function searchBars() {
  const searchTerm = document.getElementById("search-input").value;
  window.location.href = `searchResults.html?query=${searchTerm}`;

  const placesService = new google.maps.places.PlacesService(map);

  // request param
  const request = {
    location: map.getCenter(),
    radius: 5000,
    keyword: searchTerm,
    type: "bar",
  };
  // pulls search from google maps
  placesService.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      clearMarkers();

      // marker code
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    } else {
      // error message
      console.error("Error fetching places:", status);
    }
  });
}

// marker code
function createMarker(place) {
  const marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    title: place.name,
  });

  const infowindow = new google.maps.InfoWindow({
    content: `<strong>${place.name}</strong><br>${place.vicinity}`,
  });

  // click event listener
  marker.addListener("click", () => {
    infowindow.open(map, marker);
  });
  markers.push(marker);
}

// wipe off markers
function clearMarkers() {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

function initMap() {
  const map = new google.maps.Map(document.getElementById("map-container"), {
    center: { lat: -34.397, lng: 150.644 }, // initial center coordinates
    zoom: 8, // initial zoom level
  });
  map.setOptions({ gestureHandling: "greedy", disableDefaultUI: true }); // customizable map controls
  // supposed to position the map container in the corner but didn't work. breaks code when I delete this so i left it for now
  document.getElementById("map-container").style.position = "fixed";
  document.getElementById("map-container").style.top = "20px";
  document.getElementById("map-container").style.right = "20px";
}
function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

function generateCards() {
  for (let card of cards) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.setAttribute("data-name", card.name);
    cardDiv.innerHTML = `<img src=${card.image}>`;
    cardDiv.addEventListener("click", flipCard);
    gameDiv.appendChild(cardDiv);
  }
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");
  if (!firstCard) {
    firstCard = this;
    return;
  }
  secondCard = this;
  score++;
  document.querySelector(".score").textContent = score;
  lockBoard = true;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  nextTurn();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    lockBoard = false;
    nextTurn();
  }, 1500);
}

function nextTurn() {
  lockBoard = false;
  [firstCard, secondCard] = [null, null];
}

function restart() {
  nextTurn();
  shuffleCards();
  score = 0;
  document.querySelector(".score").textContent = score;
  gameDiv.innerHTML = "";
  generateCards();
}
