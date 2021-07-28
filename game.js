// rock paper and sicssors buttons
const btns = document.querySelectorAll('[data-btn]')
// scoreboard
const playerScore = document.querySelector('[data-player-score')
const computerScore = document.querySelector('[data-computer-score')
// results
const gameResult = document.querySelector('[data-game-result]')
const playerSelecton = document.querySelectorAll('[data-player-choice] i')
const computerSelection = document.querySelectorAll('[data-computer-choice] i')
// modal
const modal = document.querySelector('.modal')
const modalH2 = document.querySelector('[data-h2]')
const modalP = document.querySelector('[data-p]')
// restart round button
const restartBtn = document.querySelector('[data-restart]')

// event listener
btns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    reset()
    playRound(playerChoice(e))
    resetRound()
  })
})

restartBtn.addEventListener('click', () => {
  enable()
  restartRound()
})

// functions for game
let pScore = 0
let cScore = 0

const playerChoice = (e) => {
  const choice = e.target.dataset.game
  playerSelecton.forEach(result => {
    if (choice === result.dataset.game) {
      result.classList.remove('hide')
    }
  })
  return choice
}

const computerChoice = () => {
  // generate ranomd result for computer
  let number = Math.floor(Math.random() * 150)

  if (number % 3 === 0) {
    number = 'rock'
  } else if (number % 3 === 1) {
    number = 'paper'
  } else {
    number = 'scissors'
  }
  // remove hide for bot choice
  computerSelection.forEach(result => {
    if (number === result.dataset.game) {
      result.classList.remove('hide')
    }
  })
  return number
}

// hide result after
const reset = () => {
  playerSelecton.forEach(result => result.classList.add('hide'))
  computerSelection.forEach(result => result.classList.add('hide'))
}

// check result of who win and add 1 to scoreboard
const playRound = (player) => {
  const bot = computerChoice()
  if ((player === 'rock' && bot === 'scissors') ||
      (player === 'paper' && bot === 'rock') ||
      (player === 'scissors' && bot === 'paper')) {
    playerScore.textContent = pScore += 1
    gameResult.textContent = `You win!! Becasue ${player.toUpperCase()} beat ${bot.toUpperCase()}`
  } else if ((bot === 'rock' && player === 'scissors') ||
      (bot === 'paper' && player === 'rock') ||
      (bot === 'scissors' && player === 'paper')) {
    computerScore.textContent = cScore += 1
    gameResult.textContent = `Bot win!! Becasue ${bot.toUpperCase()} beat ${player.toUpperCase()}`
  } else if (player === bot) {
    gameResult.textContent = 'It is a tie'
  }
  disabled()
}

// show result on modal once either score reachs 5
const resetRound = () => {
  if (pScore === 5 || cScore === 5) {
    if (pScore > cScore) {
      modal.classList.remove('hidden')
      modalH2.textContent = 'Congratulation!!'
      modalP.textContent = 'You won this round'
    } else {
      modal.classList.remove('hidden')
      modalH2.textContent = 'Sorry!!'
      modalP.textContent = 'You lost this round'
    }
  }
}

const restartRound = () => {
  // reset scoreboard
  if (playerScore.textContent !== 0) {
    pScore = 0
    playerScore.textContent = pScore
  }
  if (playerScore.textContent !== 0) {
    cScore = 0
    computerScore.textContent = cScore
  }
  // clear result
  gameResult.textContent = ''
  // add hide class back to player selection and computer selection
  playerSelecton.forEach(result => {
    if (!result.classList.contains('hide')) {
      result.classList.add('hide')
    }
  })
  computerSelection.forEach(result => {
    if (!result.classList.contains('hide')) {
      result.classList.add('hide')
    }
  })
  // add hidden class back to modal
  if (!modal.classList.contains('hidden')) {
    modal.classList.add('hidden')
  }
}

// disable and enable buttons
const disabled = () => {
  if (pScore === 5 || cScore === 5) {
    btns.forEach(btn => { btn.disabled = true })
  }
}
const enable = () => {
  btns.forEach(btn => { btn.disabled = false })
}
