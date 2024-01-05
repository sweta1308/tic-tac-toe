const playerName = document.querySelector(".player");
const lives = document.querySelectorAll(".lives");
const pieces = document.querySelectorAll(".piece");
const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const modal = document.querySelector(".modal");
const result = document.querySelector(".result");
const restart = document.querySelector(".restart");

let player = "X1";
let boardValues = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let keys = [
  ["X1", 3],
  ["X2", 2],
  ["X3", 1],
  ["O1", 3],
  ["O2", 2],
  ["O3", 1],
];

const setKeys = () => {
  keys.forEach(([key, value], index) => {
    lives[index].innerText = value.toString();
  });
};

const disableKeys = () => {
  if (player.includes("X")) {
    pieces.forEach((piece) => {
      if (piece.innerText.includes("O")) {
        piece.disabled = true;
      } else {
        piece.disabled = false;
      }
    });
  } else {
    pieces.forEach((piece) => {
      if (piece.innerText.includes("X")) {
        piece.disabled = true;
      } else {
        piece.disabled = false;
      }
    });
  }
};

playerName.innerText = `${player}'s turn.`;

const isKeyAvailable = () => {
  let isAvailable = true;
  keys.forEach(([key, value]) => {
    if (key === player) {
      if (value === 0) {
        isAvailable = false;
      }
    }
  });
  return isAvailable;
};

const isEachCellFilled = () => {
  let isFilled = false;
  const filledSpaces = boardValues.flat().filter((value) => value !== "");
  if (filledSpaces.length >= 5) {
    isFilled = true;
  }
  return isFilled;
};

const isTie = () => (boardValues.flat().includes("") ? false : true);

const findWinner = () => {
  let isTrue = false;
  for (let i = 0; i < 3; i++) {
    if (boardValues[i].every((item) => item === player)) {
      isTrue = true;
    }
  }
  for (let i = 0; i < 3; i++) {
    if (boardValues.every((row) => row[i] === player)) {
      isTrue = true;
    }
  }
  if (
    boardValues.every((row, i) => row[i] === player) ||
    boardValues.every((row, i) => row[2 - i] === player)
  ) {
    isTrue = true;
  }

  return isTrue;
};

const getWinner = () => {
  if (findWinner()) {
    playerName.innerText = `X's turn.`;
    modal.style.display = "block";
    result.innerText = `Player ${player} wins!`;
  } else if (isTie()) {
    playerName.innerText = `X's turn.`;
    modal.style.display = "block";
    result.innerText = "It is a tie!";
  }
};

const handleBoardClick = (e) => {
  const row = e.target.dataset.row;
  const column = e.target.dataset.column;
  if (isKeyAvailable()) {
    if (
      !boardValues[row][column] ||
      boardValues[row][column].at(1) < player.at(1)
    ) {
      keys = keys.map((key) =>
        key[0] === player ? (key = [player, Number(key[1] - 1)]) : key
      );
      setKeys();
      boardValues[row][column] = player;
      e.target.textContent = player;
      if (isEachCellFilled()) {
        getWinner();
      }
      player = player.includes("X") ? "O1" : "X1";
      playerName.innerText = `${player}'s turn.`;
      disableKeys();
    } else {
      alert("Invalid Move!");
    }
  } else {
    alert(`${player} is not available. Select any other key.`);
  }
};

const handleRestart = () => {
  player = "X1";
  playerName.innerText = "X1's turn";
  boardValues = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  modal.style.display = "none";
  result.innerText = "";
  keys = [
    ["X1", 3],
    ["X2", 2],
    ["X3", 1],
    ["O1", 3],
    ["O2", 2],
    ["O3", 1],
  ];
  setKeys();
  cells.forEach((cell) => (cell.innerText = ""));
  disableKeys();
};

const handlePieceClick = (e) => {
  if (!e.target.disabled) {
    player = e.target.textContent.slice(1);
    playerName.innerText = `${player}'s turn.`;
  } else {
    alert(`Choose keys from ${player.includes("X") ? "X" : "O"}'s category.`);
  }
};

window.addEventListener("load", () => {
  setKeys();
  disableKeys();
});
board.addEventListener("click", (e) => handleBoardClick(e));
restart.addEventListener("click", () => handleRestart());
pieces.forEach((piece) => {
  piece.addEventListener("click", (e) => handlePieceClick(e));
});
