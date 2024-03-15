const gridContainer = document.querySelector('.grid-container');
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
document.querySelector('.score').textContent = score;

fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data]
    shuffleCards();
    generateCards();
  })

// funtion shuffleCards gives us a random sequence of the values of our array
function shuffleCards() {
  let currentIndex = cards.length,
      randomIndex,
      temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    //these next three lines are just like the Fibonacci sequence stuff
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

//for each value in the cards array, generateCards creates a div, modifies it and appends it to the grid.container
function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
      <div class="front>
      <img class="front-image" src=${card.image} />
      </div>
      <div class="back"></div>`;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}
//with these two functions present, I think there should be cards on the page even they don't do anything yet
//so I think the data stream I entered with the fetch function is not fully correct yet
//if you look at elements in the dev tools you can see a grid is being generated, it's just not visable

//flipCard functions handles the action of flipping the cards and logs the value of each card, it then ends with a call to the checkForMatch function
function flipCard() {
    if (lockBoard) return; //checks is the board is locked, if it is nothing further will be ran and will exit the function
    if (this === firstCard) return; //checks if this is the first card in the sequence being flipped, if it is the function will end with no further code being ran
   
    this.classList.add("flipped");

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
//this function compares the values of the first card logged in the flipCard function for a match
function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name; //logs a boolean value of true if cards match and false if they do not

  isMatch ? disableCards() : unFlipCards(); //uses ternary operator to shorten, if isMatch is true the disableCards function will be called and if it is false the unFlipCards funcion will be called
}
//this function pulls the cards out of play, it is called when isMatch is true in function above
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
}