// player
 function Player(name, marker) {
    this.name = name;
    this.marker = marker;
  }
  const player1 = new Player("James", "O");
  const player2 = new Player("Paul", "X");
  let currentPlayer = player1;
// IIFE
const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
//  function for playing a single round
  function playRound(index) {
    if (board[index] !=="") {
      return;
    } else {
      board[index] = currentPlayer.marker;
      if (currentPlayer === player1){
        currentPlayer = player2;
      } else {
        currentPlayer = player1;
      }
      
    }
  }
  playRound(7);
})();
const gameController;
