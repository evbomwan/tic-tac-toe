// player
function Player(name, marker) {
  this.name = name;
  this.marker = marker;
}
let player1;
let player2;
 let playerStatus = document.getElementById("status");
 let gameStarted = false;
 let gameDomDisplay = document.getElementById("game-controller");
// function for starting game btn
function startGame() {
  gameDomDisplay.style.display = "grid";
  const playerOneName = document.getElementById("player-one").value;
  const playerTwoName = document.getElementById("player-two").value;
  player1 = new Player(playerOneName || "Player one", "o");
  player2 = new Player(playerTwoName || "Player two", "x");
  gameStarted = true;
  restartGame();
}
const startbtn = document.getElementById("start-game");
startbtn.addEventListener("click", startGame);
let currentPlayer;
let gameOver = false;

// restart game
function restartGame() {
  if (!gameStarted){
    return;
  }
  gameBoard.resetBoard();
  currentPlayer = player1;
  gameOver = false;
  playerStatus.textContent = `${currentPlayer.name}'s turn`;
  displayController.render();
}
let restartBtn = document.getElementById("restart");
restartBtn.addEventListener("click", restartGame);
// the function that controls the game
function gameController(index) {

  if (!gameStarted) {
    return;
  }
  if (gameOver) {
    return;
  }
  const moveSuccesful = gameBoard.playRound(index);
  if (!moveSuccesful) {
    return;
  }
  const winner = gameBoard.checkWinner();
  if (winner) {
    gameOver = true;
    playerStatus.textContent = `${currentPlayer.name} wins!`;
    return;
  }
  if (gameBoard.checkDraw()) {
    gameOver = true;
    playerStatus.textContent = "It is a draw";
    return;
  }
  switchPlayer();
  playerStatus.textContent = `${currentPlayer.name}'s turn`;
}
function switchPlayer() {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  } else {
    currentPlayer = player1;
  }
}
// IIFE
const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  //  function for playing a single round
  function playRound(index) {
    if (board[index] !== "") {
      return false;
    } else {
      board[index] = currentPlayer.marker;
      return true;
    }
  }
  // function to check the winner
  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
        return board[a];
      }
    }
    return null;
  }
  // function for checking for draw
  function checkDraw() {
    return board.every((square) => square !== "");
  }
  // to get the board
  function getBoard() {
    return [...board];
  }
  // reset board
  function resetBoard() {
    board.fill("");
  }
  return {
    playRound,
    checkWinner,
    checkDraw,
    getBoard,
    resetBoard,
  };
})();

// IIEF for displaying the dom
const displayController = (() => {
  const cells = document.querySelectorAll(".cell");

  // function for rendering
  function render() {
    const board = gameBoard.getBoard();

    cells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  }
  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      gameController(index);
      render();
    });
  });

  render();

  return {
    render,
  };
})();
