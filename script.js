// IIFE
const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  // object constructor for players
  function createPlayer(name, marker, position) {
    this.name = name;
    this.marker = marker;
  }
  const player1 = new createPlayer("James", "O");
  const player2 = new createPlayer("Paul", "X");
  let currentPlayer = player1;
  function playRound(index) {
    if (board[index]) {
      return;
    } else {
      board[index] = currentPlayer.marker;
      currentPlayer = player2;
    }
  }
  playRound(7);
})();
