/* eslint-disable prefer-const */
/* eslint-disable init-declarations */
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
const game = (() => {
  const x = "x";
  const o = "o";
  let gameBoard = [x, o, x, o, x, o, x, o, x];
  let gameArray = [];
  let playerArray = [];
  const boxes = document.querySelectorAll(".box");

  const submit = document.querySelector(`button[type="submit"]`);
  const replay = document.querySelector(`button[name="replay"]`);
  const nameField1 = document.querySelector(`input[id="p1-name"]`);
  const nameField2 = document.querySelector(`input[id="p2-name"]`);
  const player1Display = document.querySelector("#pn1");
  const player2Display = document.querySelector("#pn2");

  const createPlayers = (() => {
    const Player = (name, mark) => {
      const players = [];
      const getName = () => name;
      const getMark = () => name;
      return {name, mark, getName, getMark};
    };
    submit.addEventListener("click", (e) => {
      e.preventDefault();
      const player1 = Player(nameField1.value, "x");
      const player2 = Player(nameField2.value, "o");
      playerArray.push([player1.name]);
      playerArray.push([player2.name]);
      player1Display.textContent = nameField1.value;
      player2Display.textContent = nameField2.value;
      nameField1.disabled = true;
      nameField2.disabled = true;
    });
  })();

  const setBoxID = (() => {
    const numberOfBoxes = 9;
    for (let i = 0; i < numberOfBoxes; i++) {
      boxes[i].setAttribute("id", `box${i + 1}`);
    }
  })();

  const addMarks = (() => {
    boxes.forEach((box) => {
      box.addEventListener("click", (e) => {
        if (e.target.textContent === "") {
          e.target.textContent = gameBoard.pop();
        }
      });
    });
  })();

  boxes.forEach((bx) => {
    bx.addEventListener("click", (e) => {
      const box1 = document.querySelector("#box1").textContent;
      const box2 = document.querySelector("#box2").textContent;
      const box3 = document.querySelector("#box3").textContent;
      const box4 = document.querySelector("#box4").textContent;
      const box5 = document.querySelector("#box5").textContent;
      const box6 = document.querySelector("#box6").textContent;
      const box7 = document.querySelector("#box7").textContent;
      const box8 = document.querySelector("#box8").textContent;
      const box9 = document.querySelector("#box9").textContent;
      const toGameArray = (() => {
        gameArray.splice(0, 0, box1);
        gameArray.splice(1, 0, box2);
        gameArray.splice(2, 0, box3);
        gameArray.splice(3, 0, box4);
        gameArray.splice(4, 0, box5);
        gameArray.splice(5, 0, box6);
        gameArray.splice(6, 0, box7);
        gameArray.splice(7, 0, box8);
        gameArray.splice(8, 0, box9);
        gameArray.splice(9);
        console.log(gameArray);
      })();
      const findWinner = (() => {
        const modal = document.querySelector(".modal");
        const trigger = document.querySelector(".trigger");
        const closeButton = document.querySelector(".close-button");
        const modalContent = document.querySelector(".modal-content > h1");

        function toggleModal() {
          modal.classList.toggle("show-modal");
        }

        function windowOnClick(event) {
          if (event.target === modal) {
            toggleModal();
          }
        }

        closeButton.addEventListener("click", toggleModal);
        window.addEventListener("click", windowOnClick);
        const grid = document.querySelector(".grid");
        if (
          (box1 === "x" && box2 === "x" && box3 === "x") ||
          (box4 === "x" && box5 === "x" && box6 === "x") ||
          (box7 === "x" && box8 === "x" && box9 === "x") ||
          (box1 === "x" && box4 === "x" && box7 === "x") ||
          (box2 === "x" && box5 === "x" && box8 === "x") ||
          (box3 === "x" && box6 === "x" && box9 === "x") ||
          (box1 === "x" && box5 === "x" && box9 === "x") ||
          (box3 === "x" && box5 === "x" && box7 === "x")
        ) {
          if (playerArray[0]) {
            modalContent.textContent = `${playerArray[0]} Wins!`;
            toggleModal();
          } else if (!playerArray[0]) {
            modalContent.textContent = `Player 1 Wins!`;
            toggleModal();
          }
        } else if (
          (box1 === "o" && box2 === "o" && box3 === "o") ||
          (box4 === "o" && box5 === "o" && box6 === "o") ||
          (box7 === "o" && box8 === "o" && box9 === "o") ||
          (box1 === "o" && box4 === "o" && box7 === "o") ||
          (box2 === "o" && box5 === "o" && box8 === "o") ||
          (box3 === "o" && box6 === "o" && box9 === "o") ||
          (box1 === "o" && box5 === "o" && box9 === "o") ||
          (box3 === "o" && box5 === "o" && box7 === "o")
        ) {
          if (playerArray[1]) {
            modalContent.textContent = `${playerArray[1]} Wins!`;
            toggleModal();
          } else if (!playerArray[1]) {
            modalContent.textContent = `Player 2 Wins!`;
            toggleModal();
          }
        }
      })();
    });
  });
  replay.addEventListener("click", (e) => {
    const clearIt = (() => {
      const gridChildren = document.querySelector(".grid").childNodes;
      const modal = document.querySelector(".modal");
      const trigger = document.querySelector(".trigger");
      const closeButton = document.querySelector(".close-button");
      const modalContent = document.querySelector(".modal-content > h1");
      for (let i = 0; i < gridChildren.length; i++) {
        if (gridChildren[i].textContent !== "") {
          gridChildren[i].textContent = "";
        }
      }
      gameArray;
      playerArray;
      nameField1.value = "";
      nameField2.value = "";
      player1Display.textContent = "Player 1";
      player2Display.textContent = "Player 2";
      nameField1.disabled = false;
      nameField2.disabled = false;
      gameBoard = [x, o, x, o, x, o, x, o, x];
      function toggleModal() {
        modal.classList.toggle("show-modal");
      }
      function windowOnClick() {
        if (e.target === modal) {
          toggleModal();
        }
      }
      closeButton.addEventListener("click", toggleModal);
      window.addEventListener("click", windowOnClick);
    })();
  });
})();
