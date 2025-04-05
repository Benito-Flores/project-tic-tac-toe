// ====================================================================
// ========================= FUNCTIONS ===========================
// ====================================================================

// Creates and manages the game board array
function createBoard() {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];

  // Returns the current state of the board
  const getBoard = () => gameBoard;

  // Marks a cell with the player's marker if it's empty
  const markCell = (index, marker) => {
    if (gameBoard[index] === "") {
      gameBoard[index] = marker;
      return true;
    }
    return false;
  };

  // Clears all cells to reset the board
  const resetBoard = () => {
    for (let i = 0; i < gameBoard.length; i++) {
      gameBoard[i] = "";
    }
  };

  return {
    getBoard,
    markCell,
    resetBoard
  };
}

// Creates a player object with a name and marker (X or O)
function createPlayer(name, marker) {
  return { name, marker };
}

// Controls game logic (turns, win check, switching players)
function gameController(player1, player2) {
  const playerA = player1;
  const playerB = player2;
  let currentPlayer = playerA;

  // Switches the current player after each valid turn
  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerB ? playerA : playerB;
  };

  // Returns the player whose turn it is
  const getCurrentPlayer = () => currentPlayer;

  // Checks all possible winning combinations for a given marker
  const checkWinner = (board, marker) => {
    return (
      (board[0] === marker && board[1] === marker && board[2] === marker) ||
      (board[3] === marker && board[4] === marker && board[5] === marker) ||
      (board[6] === marker && board[7] === marker && board[8] === marker) ||
      (board[0] === marker && board[3] === marker && board[6] === marker) ||
      (board[1] === marker && board[4] === marker && board[7] === marker) ||
      (board[2] === marker && board[5] === marker && board[8] === marker) ||
      (board[0] === marker && board[4] === marker && board[8] === marker) ||
      (board[6] === marker && board[4] === marker && board[2] === marker)
    );
  };

  // Executes one turn of the game
  const playRound = (index) => {
    const player = getCurrentPlayer();
    const success = game.markCell(index, player.marker);
    if (!success) return;

    const board = game.getBoard();
    const winner = checkWinner(board, player.marker);

    if (winner) {
      console.log(`${player.name} wins!`);
      isGameOver = true;
      return;
    }

    if (!board.includes("")) {
      console.log("It's a tie!");
      isGameOver = true;
      return;
    }

    switchPlayer();
  };

  return {
    playerA,
    playerB,
    switchPlayer,
    getCurrentPlayer,
    checkWinner,
    playRound
  };
}

// ====================================================================
// ======================= DOM MANIPULATION =======================
// ====================================================================

// DOM elements
const form = document.querySelector("form");
const startBtn = document.querySelector(".submit");
const resetBtn = document.querySelector(".reset");
const boardPiece = document.querySelectorAll(".board-piece");
const txtContainer = document.querySelector(".txt-container");

// Game state variables
let player1;
let player2;
let game;
let controller;
let isGameOver = false;

// Handles game start (player input, board setup)
startBtn.addEventListener("click", (event) => {
  event.preventDefault();

  // Create player objects from form input
  player1 = createPlayer(form.elements["player1"].value, "X");
  player2 = createPlayer(form.elements["player2"].value, "O");

  // Clear input fields
  form.elements["player1"].value = "";
  form.elements["player2"].value = "";

  // Create board and controller
  game = createBoard();
  controller = gameController(player1, player2);
  isGameOver = false;

  // Display player names
  txtContainer.textContent = `${player1.name} (X) : ${player2.name} (O)`;

  // Clear the board and set up click events
  boardPiece.forEach((piece, index) => {
    piece.textContent = "";

    piece.addEventListener("click", () => {
      if (isGameOver || piece.textContent !== "") return;

      controller.playRound(index);
      piece.textContent = game.getBoard()[index];
      updateHoverClasses();

      const board = game.getBoard();
      const current = controller.getCurrentPlayer();

      // Display result and end game if there's a winner or tie
      if (controller.checkWinner(board, current.marker)) {
        txtContainer.textContent = `${current.name} wins!`;
        isGameOver = true;
      } else if (!board.includes("")) {
        txtContainer.textContent = "It's a tie!";
        isGameOver = true;
      }
    });
  });

  updateHoverClasses();
});

// Resets the game to its initial state
resetBtn.addEventListener("click", (event) => {
  event.preventDefault();
  game.resetBoard();
  isGameOver = false;

  boardPiece.forEach(piece => {
    piece.textContent = "";
  });

  txtContainer.textContent = `${player1.name} (X) : ${player2.name} (O)`;
  updateHoverClasses();
});

// Adds or removes hover class depending on whether a cell is empty
function updateHoverClasses() {
  boardPiece.forEach(piece => {
    if (piece.textContent === "") {
      piece.classList.add("board-piece-hover");
    } else {
      piece.classList.remove("board-piece-hover");
    }
  });
}