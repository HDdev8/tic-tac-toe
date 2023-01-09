/* eslint-disable no-restricted-syntax */
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
const game = (() => {
  const gameboard = (() => {
    const generateBoard = (() => {
      const grid = document.querySelector(".grid");
      const fragment = new DocumentFragment();
      const numberOfBoxes = 9;
      for (let i = 0; i < numberOfBoxes; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.setAttribute("id", `box${i + 1}`);
        fragment.appendChild(box);
      }
      grid.appendChild(fragment);
    })();
    const playerArray = [];
    console.log(playerArray);
    const boxes = document.querySelectorAll(".box");
    const x = "x";
    const o = "o";
    const gameBoard = [x, o, x, o, x, o, x, o, x];
    const gameArray = [];
    const createPlayerModule = (() => {
      const Player = (name, mark) => {
        name;
        mark;
        return {name, mark};
      };
      const submitNames = (() => {
        const submit = document.querySelector(`button[type="submit"]`);
        submit.addEventListener("click", (e) => {
          e.preventDefault();
          const firstPlayer = document.querySelector(`input[id="p1-name"]`);
          const secondPlayer = document.querySelector(`input[id="p2-name"]`);
          const player1 = Player(firstPlayer.value, "x");
          const player2 = Player(secondPlayer.value, "o");
          playerArray.push(player1);
          playerArray.push(player2);
          return {player1, player2};
        });
      })();
    })();
    const boardActivity = (() => {
      boxes.forEach((box) => {
        box.addEventListener("click", (e) => {
          if (e.target.textContent === "") {
            e.target.textContent = gameBoard.pop();
            const box1 = document.querySelector("#box1");
            const box2 = document.querySelector("#box2");
            const box3 = document.querySelector("#box3");
            const box4 = document.querySelector("#box4");
            const box5 = document.querySelector("#box5");
            const box6 = document.querySelector("#box6");
            const box7 = document.querySelector("#box7");
            const box8 = document.querySelector("#box8");
            const box9 = document.querySelector("#box9");
            gameArray.splice(0, 0, box1.textContent);
            gameArray.splice(1, 0, box2.textContent);
            gameArray.splice(2, 0, box3.textContent);
            gameArray.splice(3, 0, box4.textContent);
            gameArray.splice(4, 0, box5.textContent);
            gameArray.splice(5, 0, box6.textContent);
            gameArray.splice(6, 0, box7.textContent);
            gameArray.splice(7, 0, box8.textContent);
            gameArray.splice(8, 0, box9.textContent);
            gameArray.splice(9);
            console.log(gameArray);
          }
        });
      });
    })();
    const playerOneWins = (() => {
      boxes.forEach((box) => {
        box.addEventListener("click", (e) => {
          e.preventDefault();
          if (
            (gameArray[0] === x && gameArray[1] === x && gameArray[2] === x) ||
            (gameArray[3] === x && gameArray[4] === x && gameArray[5] === x) ||
            (gameArray[6] === x && gameArray[7] === x && gameArray[8] === x) ||
            (gameArray[0] === x && gameArray[3] === x && gameArray[6] === x) ||
            (gameArray[1] === x && gameArray[4] === x && gameArray[7] === x) ||
            (gameArray[2] === x && gameArray[5] === x && gameArray[8] === x) ||
            (gameArray[0] === x && gameArray[4] === x && gameArray[8] === x) ||
            (gameArray[2] === x && gameArray[4] === x && gameArray[6] === x)
          ) {
            console.log(`${playerArray[0].name} is the winner!`);
          }
        });
      });
    })();
    const playerTwoWins = (() => {
      boxes.forEach((box) => {
        box.addEventListener("click", (e) => {
          if (
            (gameArray[0] === o && gameArray[1] === o && gameArray[2] === o) ||
            (gameArray[3] === o && gameArray[4] === o && gameArray[5] === o) ||
            (gameArray[6] === o && gameArray[7] === o && gameArray[8] === o) ||
            (gameArray[0] === o && gameArray[3] === o && gameArray[6] === o) ||
            (gameArray[1] === o && gameArray[4] === o && gameArray[7] === o) ||
            (gameArray[2] === o && gameArray[5] === o && gameArray[8] === o) ||
            (gameArray[0] === o && gameArray[4] === o && gameArray[8] === o) ||
            (gameArray[2] === o && gameArray[4] === o && gameArray[6] === o)
          ) {
            console.log(`${playerArray[1].name} is the winner!`);
          }
        });
      });
    })();
  })();
})();

/*
 **allow players to put in their names
 *a button to start/restart the game
 **a display element that congratulates the winning player!
 */
