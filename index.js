const playerName = document.querySelector(".player");
const cells = document.querySelectorAll(".cell");
const modal = document.querySelector(".modal");
const result = document.querySelector(".result");
const restart = document.querySelector(".restart");

let player = "X";
let boardValues = Array(9).fill("");
let timer;
const winArray = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

playerName.innerText = `${player}'s turn.`;

const showMessage = () => {
  modal.style.display = "block";
  result.innerText = `Player ${player === "X" ? "O" : "X"} wins!`;
};

const startTimer = () => {
  timer = setTimeout(showMessage, 15000);
};

startTimer();

const findWinner = () => {
  if (!boardValues.includes("")) {
    return "Tie";
  }

  for (let win of winArray) {
    if (
      boardValues[win[0]] &&
      boardValues[win[0]] === boardValues[win[1]] &&
      boardValues[win[0]] === boardValues[win[2]]
    ) {
      return boardValues[win[0]];
    }
  }

  return null;
};

const getWinner = () => {
  const winner = findWinner();
  if (winner) {
    playerName.innerText = `X's turn.`;
    modal.style.display = "block";
    if (winner === "Tie") {
      result.innerText = "It is a tie!";
    } else {
      result.innerText = `Player ${winner} wins!`;
    }
  }
};

const handleClick = (e) => {
  clearTimeout(timer);
  const index = e.target.dataset.index;
  if (!boardValues[index]) {
    boardValues[index] = player;
    cells[index].innerText = player;
    player = player === "X" ? "O" : "X";
    playerName.innerText = `${player}'s turn.`;
  }

  getWinner();
  startTimer();
};

const handleRestart = () => {
  player = "X";
  playerName.innerText = `X's turn.`;
  boardValues = Array(9).fill("");
  modal.style.display = "none";
  result.innerText = "";
  cells.forEach((cell) => (cell.innerText = ""));
  startTimer();
};

cells.forEach((cell) => {
  cell.addEventListener("click", (e) => handleClick(e));
});
restart.addEventListener("click", () => handleRestart());
