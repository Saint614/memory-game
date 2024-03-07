function flipCard() {
    if (lockBoard) return;
    if (this === firsCard) return;
    
    this.classList.add("flipped");
    if (!firstCard) {
        firstCard = this;
        return;
    }
}