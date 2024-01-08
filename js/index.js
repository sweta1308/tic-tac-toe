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

const dragStart = (e) => {
  if (!e.target.disabled) {
    player = e.target.textContent;
    playerName.innerText = `${player}'s turn.`;
    changeBackgroundColor();
  } else {
    alert(`Choose keys which are enabled.`);
  }
};

const dragEnter = (e) => {
  e.preventDefault();
  e.target.classList.add("drag-over");
};

const dragOver = (e) => {
  e.preventDefault();
  e.target.classList.add("drag-over");
};

const dragLeave = (e) => {
  e.target.classList.remove("drag-over");
};

const drop = (e) => {
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
      e.target.classList.remove("drag-over");
      changeBackgroundColor();
      updatePiece();
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
  changeBackgroundColor();
};
