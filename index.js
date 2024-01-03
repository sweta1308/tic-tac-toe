const cells = document.querySelectorAll(".cell");
const modal = document.querySelector(".modal");
const result = document.querySelector(".result");
const restart = document.querySelector(".restart");

let player = "X";
let boardValues = Array(9).fill("");
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
    modal.style.display = "block";
    if (winner === "Tie") {
      result.innerText = "It is a tie!";
    } else {
      result.innerText = `Player ${winner} wins!`;
    }
  } else {
    player = player === "X" ? "O" : "X";
  }
};

const handleClick = (e) => {
  const index = e.target.dataset.index;
  if (!boardValues[index]) {
    boardValues[index] = player;
    cells[index].innerText = player;
  }

  getWinner();
};

const handleRestart = () => {
  player = "X";
  boardValues = Array(9).fill("");
  modal.style.display = "none";
  cells.forEach((cell) => (cell.innerText = ""));
  result.innerText = "";
};

cells.forEach((cell) => {
  cell.addEventListener("click", (e) => handleClick(e));
});
restart.addEventListener("click", () => handleRestart());
