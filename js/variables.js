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
