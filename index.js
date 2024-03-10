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