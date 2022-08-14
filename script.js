'use strict';
let secretNumber,
  scoreNumber = 20,
  highscore = 0;

// Element
const guessNumberELm = document.querySelector('.guess');
const numberElm = document.querySelector('.number');
const checkBtnElm = document.querySelector('.check');
const messageElm = document.querySelector('.message');
const body = document.body;
const scoreElm = document.querySelector('.score');
const highscoreElm = document.querySelector('.highscore');

//action function
function guessProcess(inputGuessNo) {
  const canGuess = scoreNumber == 1 ? 0 : 1;

  if (canGuess) {
    scoreNumber--;
    scoreElm.textContent = scoreNumber;
    if (secretNumber == inputGuessNo) {
      endGame(1);
    } else if (secretNumber > inputGuessNo) {
      showMessage('📉 Too low!');
    } else {
      showMessage('📈 Too high!');
    }
  } else {
    scoreElm.textContent = 0;
    endGame(0);
  }
}

function checkHightScore() {
  const newScore = highscore <= scoreNumber;
  if (newScore) highscoreElm.textContent = scoreNumber;
}

function endGame(win) {
  if (win) {
    showMessage('🎉 Correct Number!');
    checkHightScore();
    body.classList.add('win');
    numberElm.textContent = secretNumber;
  } else {
    showMessage('💥 You lost the game!');
  }
  checkBtnElm.disabled = true;
}
function showMessage(text) {
  messageElm.textContent = text;
}

//handler Function
function guessHandler() {
  const guessNumber = guessNumberELm.value;
  guessNumber ? guessProcess(guessNumber) : showMessage('⛔️ No number!');
}

function restartGameHandler() {
  scoreNumber = 20;
  scoreElm.textContent = scoreNumber;
  checkBtnElm.disabled = false;

  body.classList.contains('win') && body.classList.remove('win');

  secretNumber = Math.floor(Math.random() * 20);
  showMessage('Start guessing...');

  guessNumberELm.value = '';
}

//main
secretNumber = Math.floor(Math.random() * 20);
