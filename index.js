const gameDiv = document.querySelector('.game');
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
  });

// function shuffleCards gives us a random sequence of the values of our array
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

//for each value in the cards array, generateCards creates a div, modifies it and appends it to the gameDiv
function generateCards() {
  for (let card of cards) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.setAttribute("data-name", card.name);
    cardDiv.innerHTML = `
      <div class="front">
      <img src=${card.image} />
      </div>`
  //<div class="back"></div>
    cardDiv.addEventListener("click", flipCard);
    gameDiv.appendChild(cardDiv);
  }
}


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

//unflip card function
const cards = document.querySelectorAll('.memory-card');

  let hasFlippedCard = false;
+ let lockBoard = false;
  let firstCard, secondCard;

  function flipCard() {
+   if (lockBoard) return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    hasFlippedCard = false;

    checkForMatch();
  }

  function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  }

  function unflipCards() {
+     lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

+     lockBoard = false;
    }, 1500);
  }

  cards.forEach(card => card.addEventListener('click', flipCard));

//reset board
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
//restart game
document.querySelector('.restart-btn').addEventListener('click', function(){
  window.location.reload();
  return false;
});