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
