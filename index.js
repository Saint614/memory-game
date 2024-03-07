//const gridContainer = document.querySelector('.grid-container');
let cards = [1, 2, 3, 4, 5, 6];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
//document.querySelector('.score').textContent = score;

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
  console.log(cards);
}








function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    
    this.classList.add("flipped");
    if (!firstCard) {
        firstCard = this;
        return;
    }
}