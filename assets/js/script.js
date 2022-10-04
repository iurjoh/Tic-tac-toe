// selecting all data from cells
const cellElements = document.querySelectorAll("[data-cell]");

// selecting data from the board
const board = document.querySelector("[data-board]");

// All text for end game messages
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessage = document.querySelector("[data-winning-message]");

// 2p button
const twoPlayersButton = document.querySelector("[data-twoplayers-button]");

// cpu button
const cpuButton = document.querySelector("[data-cpu-button]");

// restart button
const restartButton = document.querySelector("[data-restart-button]");

// disable and insert in "startGame const"
let isCircleTurn;

window.addEventListener("load", () => {
  const menu = document.querySelector(".menu");
  //menu.style.display = 'flex'
});

// winning combinations
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

// each cell clicked will be filled only once
const startGame = (playing) => {
  if (playing === "CPUPlaying") {
    console.log("cpu <====");
    
    // against CPU
    const vsCpu = startGame("CPUPlaying") => {
    const cells = Array.from(document.getElementsByClassName("cell"));
    const emptyCells = [];
    cells.forEach((cell) => {
    if (cell.textContent == "") {
      // return 'X' ou 'O' inside cells
      emptyCells.push(cell); // if empty = `emptyCells`
    }
    });

    // random number between 0 and 8
   const random = Math.floor(Math.random() * emptyCells.length) - 1;
    emptyCells[random].textContent = ".cell.circle"; // put and O in cell when cpu plays
  }
  } else {
    console.log("twoPlaying <====");
    isCircleTurn = false;

    for (const cell of cellElements) {
      cell.classList.remove("circle");
      cell.classList.remove("x");
      cell.removeEventListener("click", handleClick);
      cell.addEventListener("click", handleClick, { once: true });
    }

    setBoardHoverClass();
    winningMessage.classList.remove("show-winning-message");
  }
};



// end game and restart button
const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageTextElement.innerText = "Draw!";
  } else {
    winningMessageTextElement.innerText = isCircleTurn
      ? "Circle Won!"
      : "X Won!";
  }

  winningMessage.classList.add("show-winning-message");
};

// check for win
const checkForWin = (currentPlayer) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

// check for draw
const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

// hover
const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

// switch icons X and O between turns
const swapTurns = () => {
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
};

const handleClick = (e) => {
  // set X or O
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  placeMark(cell, classToAdd);

  // check if win
  const isWin = checkForWin(classToAdd);

  // check if draw
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    // switch between icons X and O
    swapTurns();
  }
};

startGame();

twoPlayersButton.addEventListener("click", () => startGame("2Playing"));

cpuButton.addEventListener("click", () => startGame("CPUPlaying"));

restartButton.addEventListener("click", () => startGame());

// Score area
incrementXScore();
//incrementCircleScore();

function incrementXScore() {
  let oldScore = parseInt(document.getElementById("x-score").innerText);
  document.getElementById("x-score").innerText = ++oldScore;
}

function incrementOScore() {
  let oldScore = parseInt(document.getElementById("circle-score").innerText);
  document.getElementById("circle-score").innerText = ++oldScore;
}
