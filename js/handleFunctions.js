const dragStart = (e) => {
  if (!e.target.disabled) {
    player = e.target.textContent.slice(1);
    playerName.innerText = `${player}'s turn.`;
  } else {
    alert(`Choose keys from ${player.includes("X") ? "X" : "O"}'s category.`);
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
