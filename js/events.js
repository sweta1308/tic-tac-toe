window.addEventListener("load", () => {
  playerName.innerText = `${player}'s turn.`;
  setKeys();
  disableKeys();
  changeBackgroundColor();
});
restart.addEventListener("click", () => handleRestart());
pieces.forEach((piece) => {
  piece.addEventListener("dragstart", (e) => dragStart(e));
});
cells.forEach((cell) => {
  cell.addEventListener("dragenter", dragEnter);
  cell.addEventListener("dragover", dragOver);
  cell.addEventListener("dragleave", dragLeave);
  cell.addEventListener("drop", drop);
});
