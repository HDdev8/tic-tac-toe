/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/*
 *store the gameboard as an array inside of a Gameboard object
 *probably going to want an object to control the flow of the game itself.
 *IF YOU ONLY EVER NEED ONE OF SOMETHING (GAMEBOARD, DISPLAYCONTROLLER), USE A MODULE.
 *Think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in the game, player or gameboard objects
 */
// Player: Controller; Game: Model; Gameboard: View?
// Where does displayController fit in?

// const gameBoard = [x, o, x, o, x, o, x, o, x];
// gameBoard[(0, 1, 2)];

const gameboard = (() => {
  const generateBoard = () => {
    const grid = document.querySelector(".grid");
    const fragment = new DocumentFragment();
    const numberOfBoxes = 9;
    for (let i = 0; i < numberOfBoxes; i++) {
      const box = document.createElement("div");
      box.classList.add("box");
      fragment.appendChild(box);
    }
    grid.appendChild(fragment);
  };
  generateBoard();
})();

const Player = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;
  const addMark = () => {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
      box.addEventListener("click", (e) => {
        if (e.target.textContent === "") {
          e.target.textContent = mark;
        }
      });
    });
  };
  const marking = addMark();
  return {getName, getMark};
};
const player1 = Player("bob", "x");
const player2 = Player("deb", "o");

function gameOver(winningPlayer) {
  console.log("Congratulations!");
  console.log(`${winningPlayer.name} is the winner!`);
}

/*
 *Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie. */

/*
 **allow players to put in their names
 *a button to start/restart the game
 **a display element that congratulates the winning player!
 */

const winner = () => {
  const boxes = document.querySelectorAll(".box");
  // const range = new Range();
  // range.setStartBefore(boxes[0]);
  // range.setEndAfter(boxes[2]);
  const firstRow = document.querySelector(
    `.grid:nth-child(n+1):nth-child(-n+3)`
  ).textContent;
  const secondRow = document.querySelector(
    `.grid:nth-child(n+4):nth-child(-n+6)`
  ).textContent;
  const thirdRow = document.querySelector(
    `.grid:nth-child(n+7):nth-child(-n+9)`
  ).textContent;
  const firstColumn = document.querySelector(
    `.grid:nth-child(3n+1)`
  ).textContent;
  const secondColumn = document.querySelector(
    `.grid:nth-child(3n+2)`
  ).textContent;
  const thirdColumn = document.querySelector(
    `.grid:nth-child(3n+3)`
  ).textContent;
  const firstDiagonal = document.querySelector(
    `.grid:nth-child(4n+1)`
  ).textContent;
  const secondDiagonal = document.querySelector(
    `.grid:nth-child(2n+3)`
  ).textContent;
  if (
    firstRow === mark ||
    secondRow === mark ||
    thirdRow === mark ||
    firstColumn === mark ||
    secondColumn === mark ||
    thirdColumn === mark ||
    firstDiagonal === mark ||
    secondDiagonal === mark
  ) {
    console.log("Congratulations!");
    console.log(name + " is the winner!");
  }
};

/*  if (
    firstRow.textContent === mark ||
    secondRow.textContent === mark ||
    thirdRow.textContent === mark ||
    firstColumn.textContent === mark ||
    secondColumn.textContent === mark ||
    thirdColumn.textContent === mark ||
    firstDiagonal.textContent === mark ||
    secondDiagonal.textContent === mark
  ) */
