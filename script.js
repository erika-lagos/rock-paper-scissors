const bodyElement = document.querySelector('body');
const playerOptionsElements = document.querySelectorAll('.player-option');
const computerOptionsElements = document.querySelectorAll('.computer-option')
const playerChoiceElement = document.querySelector('.player-choice');
const computerChoiceElement = document.querySelector('.computer-choice');
const roundResultElement = document.querySelector('.result');
const playerScoreElement = document.querySelector('.player-score');
const computerScoreElement = document.querySelector('.computer-score');
const roundElement = document.querySelector('.round');
let round = 1;
let playerScore = 0;
let computerScore = 0;
let gameEnabled = true;

for(const option of playerOptionsElements) {
    option.addEventListener('click', e => {
        if(!gameEnabled) return;
        const target = e.target.closest('li');
        const playerChoice = target.dataset.choice;
        //Remove any other selections
        resetSelection(playerOptionsElements);
        //Display current selection
        target.classList.add('selected');
        playerChoiceElement.textContent = `You chose ${playerChoice}`;
        //Generate computer choice
        const computerChoice = getComputerChoice();
        displayComputerChoice(computerChoice);
        //Play round
        const roundScore = playRound(playerChoice, computerChoice);
        //Show result
        roundResultElement.textContent = buildMessage(roundScore[0], roundScore[1], playerChoice, computerChoice);
        //Update the score
        playerScore += roundScore[0];
        playerScoreElement.textContent = playerScore;
        computerScore += roundScore[1];
        computerScoreElement.textContent = computerScore;
        //If a player has 5 points, terminate game
        if (playerScore === 5 || computerScore === 5) {
            terminateGame();
        } else {
            round++;
            roundElement.textContent = `Round ${round}`;
        }
    }, true);
}

function resetSelection(elements) {
    for(const choice of elements) {
        choice.classList.remove('selected');
    }
}

function displayComputerChoice(choice) {
    for (const option of computerOptionsElements) {
        if (choice === option.dataset.choice) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    }
    computerChoiceElement.textContent = `Computer chooses ${choice}`;
}

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const rand = Math.floor(Math.random()*3);
    return choices[rand];
}

function playRound(playerChoice, computerChoice) {
    
    if (playerChoice === computerChoice) {
        return [1,1];
    }

  if (playerChoice === 'rock') {
    if (computerChoice === 'scissors') {
        return [1,0];
    }
    return [0,1];
  }
  if (playerChoice === 'paper') {
    if (computerChoice === 'rock') {
        return [1,0];
    }
    return [0,1];
  }
  if (playerChoice === 'scissors') {
    if (computerChoice === 'paper') {
        return [1,0];
    }
    return [0,1];
  }
}

function buildMessage(playerWins, computerWins, playerChoice, computerChoice) {
    if (playerWins === computerWins) {
        return `It's a tie! You both chose ${playerChoice}`;
    }
    return `You ${playerWins > 0 ? 'win' : 'lose'}! ${playerWins > 0 ? playerChoice : computerChoice} beats ${playerWins > 0 ? computerChoice : playerChoice}`;
}

function terminateGame() {
    const message = `Game over! You ${playerScore >= computerScore ? 'Win' : 'Lose'}. Play another round??`;
    const paragraph = document.createElement('p');
    paragraph.textContent = message;
    paragraph.classList.add('result','final');
    const button = document.createElement('button');
    button.textContent = 'Play Again';
    button.addEventListener('click', e => {
        initialize();
    })
    bodyElement.appendChild(paragraph);
    bodyElement.appendChild(button);
    gameEnabled = false;
}

function disableGame() {
    for (option of playerOptionsElements) {
        option.classList.remove('enabled');
    }
}

function initialize() {
    resetSelection(computerOptionsElements);
    resetSelection(playerOptionsElements);
    gameEnabled = true;
    let round = 1;
    let playerScore = 0;
    let computerScore = 0;
    playerScoreElement.textContent  = playerScore;
    computerScoreElement.textContent  = computerScore;
    roundElement.textContent = `Round ${round}`;
    roundResultElement.textContent = `Make a selection to start playing`;
    playerChoiceElement.textContent = '';
    computerChoiceElement.textContent = '';
    const finalMessage = document.querySelector('.final');
    const button = document.querySelector('button');
    finalMessage.remove();
    button.remove();
}