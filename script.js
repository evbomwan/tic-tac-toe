// player
function Player(name, marker) {
  this.name = name;
  this.marker = marker;
}
const player1 = new Player("James", "O");
const player2 = new Player("Paul", "X");
let currentPlayer = player1;
// the function that controls the game
function gameController(index) {
  const moveSuccesful = gameBoard.playRound(index);
  if (!moveSuccesful){
    return;
  }
  const winner = gameBoard.checkWinner();
  if (winner) {
    console.log(`${winner} wins`);
    return;
  }
  if (gameBoard.checkDraw()){
    console.log("It's a draw")
  }
  switchPlayer();
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
  const board = ["", "", "",
                 "", "", "", 
                 "", "", ""];
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
  function checkWinner(){
    const winningCombinations = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    for (const combination of winningCombinations){
      const [a,b,c] = combination;
      if (board[a] !== "" &&
          board[a] === board[b] &&
          board[b] === board[c]
      ) {
        return board[a];
      }
    }
    return null;
  }
  // function for checking for draw
  function checkDraw() {
    return board.every(square => square !== "");
  }
  return {
    playRound,
    checkWinner,
    checkDraw,
  };
  
})();
