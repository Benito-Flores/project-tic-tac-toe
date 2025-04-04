// ====================================================================
// ========================= FUNCTIONS ===========================
// ====================================================================


// creates board
function createBoard() {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];

  // function that calls the board
  const getBoard = () => gameBoard;
  // function that marks a cell if it's an empty string
  const markCell = function(boardIndex, marker) {
    if (gameBoard[boardIndex] === "") {
       return gameBoard[boardIndex] = marker;
    };
  };
  // function to reset a board
  const resetBoard = function() {
    // loops through the entire array
    for(let i = 0; i < gameBoard.length; i++) {
      gameBoard[i] = "";
    };
  };

  // returns only the functions to be called
  // prevents gameBoard from being manipulated on the global scope
  return {
    getBoard,
    markCell,
    resetBoard
  };
};


// creates player
function createPlayer(name, marker) {
  // returns attributes into an object
  return {
    name,
    marker
  };
  // same as:
  // return {
  //   name: name
  //   marker: marker
  // }
};


// controller that controls actions of the players
function gameController(player1, player2) {
  const playerA = player1;
  const playerB = player2;

  let currentPlayer = playerA;

  // logic () is empty to prevent shadowing a variable
  // this manipulates currentPlayer variable
  function switchPlayer() {
    if(currentPlayer === playerB) {
      currentPlayer = playerA;
    } else {
      currentPlayer = playerB;
    };
  };

  // function calls the currentPlayer after it's
  // reassigned with the switchPlayer function
  const getCurrentPlayer = () => currentPlayer;

  // Takes gameBoard array and player's marker to check for a win
  function checkWinner(gameBoard, marker) {
    return (
      (gameBoard[0] === marker && gameBoard[1] === marker && gameBoard[2] === marker) ||
      (gameBoard[3] === marker && gameBoard[4] === marker && gameBoard[5] === marker) ||
      (gameBoard[6] === marker && gameBoard[7] === marker && gameBoard[8] === marker) ||
      (gameBoard[0] === marker && gameBoard[3] === marker && gameBoard[6] === marker) ||
      (gameBoard[1] === marker && gameBoard[4] === marker && gameBoard[7] === marker) ||
      (gameBoard[2] === marker && gameBoard[5] === marker && gameBoard[8] === marker) ||
      (gameBoard[0] === marker && gameBoard[4] === marker && gameBoard[8] === marker) ||
      (gameBoard[6] === marker && gameBoard[4] === marker && gameBoard[2] === marker)
    );
  }

  function playRound(index) {
    // 1. Get the current player
    const player = getCurrentPlayer();
  
    // 2. Try to mark the board at the selected index
    const success = game.markCell(index, player.marker);
  
    // 3. If the cell was already taken, do nothing
    if (!success) return;
  
    // 4. Check if that move wins the game
    const board = game.getBoard();
    const winner = checkWinner(board, player.marker);
  
    if (winner) {
      console.log(`${player.name} wins!`);
      return;
    }
  
    // 5. If it's not a win, switch turns
    switchPlayer();
  }
 
  //if (checkWinner(game.getBoard(), controller.getPlayer().marker)) {
  //  console.log(`${controller.getPlayer().name} is the WINNER!`);
  //}

  // DO NOT return currentPlayer
  // because it will save it at compilation as playerA,
  // always returning playerA
  return {
    playerA,
    playerB,
    switchPlayer,
    getCurrentPlayer,
    checkWinner,
    playRound
  };
};

// ====================================================================
// ========================= Testing Code =========================
// ====================================================================
const game = createBoard();
console.log(game.getBoard());
// game.markCell(5, "X");
// console.log(game.getBoard());

// const player1 = createPlayer("Benito", "X");
// const player2 = createPlayer("Caitlyn", "O");
// console.log(player1.name);
// console.log(player1.marker);
// console.log(player2.name);
// console.log(player2.marker);

// const controller = gameController(player1, player2);
// console.log(controller);
// console.log(controller.getCurrentPlayer());
// controller.switchPlayer();
// console.log(controller.getCurrentPlayer());

// console.log(controller.getCurrentPlayer().name);

// for(let i = 0; i < 3; i++) {
//   game.markCell(i, controller.getCurrentPlayer().marker);
// };

// console.log(game.getBoard());

// console.log(controller.checkWinner(game.getBoard(), controller.getCurrentPlayer().marker));

// ====================================================================
// ======================= DOM MANIPULATION =======================
// ====================================================================

// global variables
const form = document.querySelector("form");
const startBtn = document.querySelector(".submit");
const resetBtn = document.querySelector(".reset");
const boardPiece = document.querySelectorAll(".board-piece");
let player1 = "";
let player2 = "";

startBtn.addEventListener("click", (event) => {
  event.preventDefault();

  player1 = createPlayer(form.elements["player1"].value, "X");
  player2 = createPlayer(form.elements["player2"].value, "O");
  
});

resetBtn.addEventListener("click", () => {
  console.log(player1);
});

// 
boardPiece.forEach(piece => {
  if (piece.textContent === "") {
    piece.classList.add("board-piece-hover");
  };
});