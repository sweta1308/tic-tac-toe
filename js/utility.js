const setKeys = () => {
  keys.forEach(([key, value], index) => {
    lives[index].innerText = value.toString();
  });
};

const updatePiece = () => {
  keys.forEach(([key, value]) => {
    for (i = 0; i < pieces.length; i++) {
      if (pieces[i].textContent === key) {
        if (value === 0) {
          pieces[i].disabled = true;
        }
      }
    }
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

const updatePieces = () => {
  keys.forEach(([key, value]) => {
    const piece = pieces.find((p) => piece.textContent.slice(1) === player);
  });
};

const isEachCellFilled = () => {
  let isFilled = false;
  const filledSpaces = boardValues.flat().filter((value) => value !== "");
  if (filledSpaces.length >= 5) {
    isFilled = true;
  }
  return isFilled;
};

const changeBackgroundColor = () => {
  pieces.forEach((piece) => {
    if (piece.textContent === player) {
      piece.style.backgroundColor = "rgb(142, 253, 142)";
    } else {
      piece.style.backgroundColor = "";
    }
  });
};

const isTie = () =>
  !boardValues.flat().includes("") || keys.every((key) => key[1] === 0)
    ? true
    : false;
