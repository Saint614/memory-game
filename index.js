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
    cardDiv.innerHTML = `
      <div class="front">
      <img src=${card.image} />
      </div><div class="back"></div>`
    cardDiv.addEventListener("click", flipCard);
    gameDiv.appendChild(cardDiv);
  }
}

function flipCard() {
  if (lockBoard) return;
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
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      lockBoard = false;
      resetBoard();
    }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

cards = document.querySelectorAll('.memory-card');
cards.forEach(card => card.addEventListener('click', flipCard));
//restart game
document.querySelector('.restart-btn').addEventListener('click', function(){
window.location.reload();
return false;
});