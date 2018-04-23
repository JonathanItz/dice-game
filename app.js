/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying, isSix, setScore

init()

document.addEventListener('keypress', (e) => {
  if( e.keyCode === 13 ) {
    setTheScore()
  }
})

document.querySelector('.score').addEventListener('click', () => {
  setTheScore()
});

 // Sets the score board for the game and UI
function setTheScore() {
  setScore = document.querySelector('.set-score').value
  document.querySelector('p span').textContent = setScore
}

document.querySelector('.btn-roll').addEventListener('click', () => {

  if(gamePlaying) {
      // Gets a random Number
    let dice = Math.floor(Math.random() * 6) + 1

    if( dice === 6 ) {
      if( isSix ) {
        document.querySelector('#score-' + activePlayer).textContent = '0'
        scores[activePlayer]
        nextPlayer()
      }
      isSix = true
    } else {
      isSix = false
    }

      // Display the results
    let diceDOM = document.querySelector('.dice')
    diceDOM.style.display = 'block'

      // Changes the src attribute of the dice
    diceDOM.src = 'dice-' + dice + '.png'


      // Updates the round score IF the rolled number was NOT a 1
    if( dice !== 1 ) {
      // Add score
      roundScore += dice
      document.querySelector('#current-' + activePlayer).textContent = roundScore
    } else {
      //Next Player
      nextPlayer()
    }
  }

})

document.querySelector('.btn-hold').addEventListener('click', () => {
  if(gamePlaying) {
    // Add current score to GLOBAL score
    scores[activePlayer] += roundScore

    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]

    // Check if player won the game
    if( scores[activePlayer] >= setScore ) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner'
      document.querySelector('.dice').style.display = 'none'
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
      gamePlaying = false;
    } else {
      //Next Player
      nextPlayer()
    }
  }
})

document.querySelector('.btn-new').addEventListener('click', init)

function init() {
  scores = [0,0]
  activePlayer = 0;
  roundScore = 0;

  gamePlaying = true;

    // Makes the dice disappear
  document.querySelector('.dice').style.display = 'none'

    // Sets the UI values to 0
  document.getElementById('score-0').textContent = '0'
  document.getElementById('score-1').textContent = '0'
  document.getElementById('current-0').textContent = '0'
  document.getElementById('current-1').textContent = '0'

  document.getElementById('name-0').textContent = 'Player 1'
  document.getElementById('name-1').textContent = 'Player 2'

  document.querySelector('.player-0-panel').classList.remove('active')
  document.querySelector('.player-1-panel').classList.remove('active')
  document.querySelector('.player-0-panel').classList.add('active')
  document.querySelector('.player-0-panel').classList.remove('winner')
  document.querySelector('.player-1-panel').classList.remove('winner')
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    roundScore = 0

    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'

    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')

    document.querySelector('.dice').style.display = 'none'
}
