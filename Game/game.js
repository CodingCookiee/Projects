document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".button");
  const result = document.getElementById("result");
  const restart = document.getElementById("restart-button");
  const playerScore = document.getElementById("player-score");
  const computerScore = document.getElementById("computer-score");

  for (const button of buttons) {
    button.addEventListener("click", () => {
      let playerChoice = button.id;
      let computerChoice = getComputerChoice();
      let winner = getWinner(playerChoice, computerChoice);
      updateScore(winner);
      displayResult(winner, playerChoice, computerChoice);
    });
  }

  restart.addEventListener("click", () => {
    playerScore.textContent = "0";
    computerScore.textContent = "0";
    result.textContent = "Start Again";
  });
  function getComputerChoice() {
    let choices = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }
  function getWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
      return "draw";
    }
    if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "scissors" && computerChoice === "paper") ||
      (playerChoice === "paper" && computerChoice === "rock")
    ) {
      return "player";
    }
    return "computer";
  }
  function updateScore(winner) {
    if (winner === "player") {
      let currentScore = parseInt(playerScore.textContent);
      playerScore.textContent = currentScore + 1;
    }
    if (winner === "computer") {
      let currentScore = parseInt(computerScore.textContent);
      computerScore.textContent = currentScore + 1;
    }
  }
  function displayResult(winner, playerChoice, computerChoice) {
    let message;
    if (winner === "draw") {
      message = `It's a draw! You both chose ${playerChoice}.`;
    }
    if (winner === "player") {
      message = `You win! ${playerChoice} beats ${computerChoice}.`;
    }
    if (winner === "computer") {
      message = `You lose! ${computerChoice} beats ${playerChoice}.`;
    }
    result.textContent = message;
  }
});
