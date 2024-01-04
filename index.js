const playerName = document.querySelector(".player");
const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const modal = document.querySelector(".modal");
const result = document.querySelector(".result");
const restart = document.querySelector(".restart");

let player = "X";
let boardValues = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

playerName.innerText = `${player}'s turn.`;

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
  if (!boardValues[row][column]) {
    boardValues[row][column] = player;
    e.target.textContent = player;
    if (isEachCellFilled()) {
      getWinner();
    }
    player = player === "X" ? "O" : "X";
    playerName.innerText = `${player}'s turn.`;
  } else {
    alert("This cell is already occupied!");
  }
};

const handleRestart = () => {
  player = "X";
  playerName.innerText = "X's turn";
  boardValues = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  modal.style.display = "none";
  result.innerText = "";
  cells.forEach((cell) => (cell.innerText = ""));
};

board.addEventListener("click", (e) => handleBoardClick(e));
restart.addEventListener("click", () => handleRestart());
