const cards = document.querySelectorAll('.memory-card');
const status = document.querySelector('#win');
const restart = document.querySelector('#restart');
const winMessage = document.querySelector('#win');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
  } else {
    // second Click
    secondCard = this;
    checkForMatch();
  }
}

function checkForMatch() {
  //do cards match?
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    // A MATCH
    disableCards();
    if (won()) {
      setTimeout(() => {
        alert('You won!');
      }, 1000);
    }
  } else {
    // NO MATCH
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}
//matts
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1100);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

cards.forEach(card => card.addEventListener('click', flipCard));

const unflipAll = () => {
  cards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });
  shuffle();
};

restart.addEventListener('click', unflipAll);

const won = () => {
  const cardsArr = Array.from(cards);
  return cardsArr.every(card => card.classList.contains('flip'));
};
shuffle();
