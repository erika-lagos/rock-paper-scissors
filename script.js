function getComputerChoice() {
    const choices = ['Rock', 'Paper', 'Scissors'];
    const rand = Math.floor(Math.random()*3);
    return choices[rand];
}

function getPlayerChoice() {
    const playerSelection = prompt('Choose Rock, Paper, or Scissors');
    return playerSelection[0].toUpperCase() + playerSelection.slice(1).toLowerCase();
}

function playRound(playerSelection, computerSelection) {
    
    if (playerSelection === computerSelection) {
        return [1,1];
    }

  if (playerSelection === 'Rock') {
    if (computerSelection === 'Scissors') {
        return [1,0];
    }
    return [0,1];
  }
  if (playerSelection === 'Paper') {
    if (computerSelection === 'Rock') {
        return [1,0];
    }
    return [0,1];
  }
  if (playerSelection === 'Scissors') {
    if (computerSelection === 'Paper') {
        return [1,0];
    }
    return [0,1];
  }
}

function buildMessage(playerWins, computerWins, playerSelection, computerSelection) {
    if (playerWins === computerWins) {
        return `It's a tie! You both chose ${playerSelection}`;
    }
    return `You ${playerWins > 0 ? 'win' : 'lose'}! ${playerWins > 0 ? playerSelection : computerSelection} beats ${playerWins > 0 ? computerSelection : playerSelection}`;
}

function game() {
    let playerScore = 0;
    let computerScore = 0;
    let playerSelection;
    let computerSelection;
    for (let i = 0; i < 5; i++) {
        playerSelection = getPlayerChoice();
        computerSelection = getComputerChoice();
        [playerWon, computerWon] = playRound(playerSelection, computerSelection);
        playerScore += playerWon;
        computerScore += computerWon;
        console.log(buildMessage(playerWon, computerWon, playerSelection, computerSelection));
    }
    let message;
    if (computerScore === playerScore) {
        message = `It's a tie!`;
    } else {
        message = `You ${playerScore > computerScore ? 'Win!' : 'Lose!'}`;
    }
    message = `${message} Final score is ${playerScore}-${computerScore}`;
    console.log(message);
}

game();