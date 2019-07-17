/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var currentScore, totalScore, currentPlayer, gamePlaying, diceDisplay, lastDiceRoll, dice, winScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    dice = Math.floor(Math.random() * 6) + 1;
    diceDisplay = document.querySelector('.dice');
    diceDisplay.style.display = 'block';
    diceDisplay.src = 'dice-' + dice + '.png';
    if (dice === 1) {
      nextPlayer();
    } else if (lastDiceRoll === 6 && dice === 6) {
      totalScore[currentPlayer] = 0;
      document.querySelector('#score-' + currentPlayer).textContent = totalScore[currentPlayer];
      nextPlayer();
    } else {
      currentScore += dice;
      document.querySelector('#current-' + currentPlayer).textContent = currentScore;
      lastDiceRoll = dice;
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    totalScore[currentPlayer] += currentScore;
    document.querySelector('#score-' + currentPlayer).textContent = totalScore[currentPlayer];

    if (totalScore[currentPlayer] >= winScore) {
      document.querySelector('#name-' + currentPlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

document.getElementById('win-score').addEventListener('change', function() {
  winScore = document.getElementById('win-score').value;
});

function nextPlayer() {
  currentScore = 0;
  lastDiceRoll = 0;
  document.querySelector('#current-' + currentPlayer).textContent = 0;
  currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}

function init() {
  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContnet = 0;
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  currentPlayer = 0;
  currentScore = 0;
  totalScore = [0, 0];
  gamePlaying = true;
  dice = 0;
  lastDiceRoll = 0;
  diceDisplay = document.querySelector('.dice');
  diceDisplay.style.display = 'none';
  winScore = document.getElementById('win-score').value;
}
