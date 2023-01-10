/* eslint-disable prefer-const */
/* eslint-disable init-declarations */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/*
 *store the gameboardArray as an array inside of a gameboardArray object
 *probably going to want an object to control the flow of the game itself.
 *IF YOU ONLY EVER NEED ONE OF SOMETHING (gameboardArray, DISPLAYCONTROLLER), USE A MODULE.
 *Think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in the game, player or gameboardArray objects
 */
// Player: Controller; Game: Model; gameboardArray: View?
// Where does displayController fit in?
const game = (() => {
  const x = "x";
  const o = "o";
  let gameboardArray = [x, o, x, o, x, o, x, o, x];
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
          e.target.textContent = gameboardArray.pop();
        }
      });
    });
  })();

  // const boxes = document.querySelectorAll(".box");
  boxes.forEach((bx) => {
    bx.addEventListener("click", (e) => {
      const nodes = [...boxes];
      for (let i = 0; i < nodes.length; i++) {
        gameArray.splice(i, 0, nodes[i].textContent);
        gameArray.splice(9);
      }

      const firstRow = Array.from(
        document.querySelectorAll(`.box:nth-child(-n+3)`)
      );
      const secondRow = Array.from(
        document.querySelectorAll(`.box:nth-child(n+4):nth-child(-n+6)`)
      );
      const thirdRow = Array.from(
        document.querySelectorAll(`.box:nth-child(n+7)`)
      );
      const firstColumn = Array.from(
        document.querySelectorAll(`.box:nth-child(3n+1)`)
      );
      const secondColumn = Array.from(
        document.querySelectorAll(`.box:nth-child(3n+2)`)
      );
      const thirdColumn = Array.from(
        document.querySelectorAll(`.box:nth-child(3n+3)`)
      );
      const firstDiagonal = Array.from(
        document.querySelectorAll(`.box:nth-child(4n+1)`)
      );
      const secondDiagonal = Array.from(
        document.querySelectorAll(`.box:nth-child(2n+3):not(last-child)`)
      );

      const findWinner = (() => {
        const modal = document.querySelector(".modal");
        const trigger = document.querySelector(".trigger");
        const closeButton = document.querySelector(".close-button");
        const modalContent = document.querySelector(".modal-content > h1");
        const toggleModal = () => {
          modal.classList.toggle("show-modal");
        };
        const closeModal = () => {
          modal.classList.remove("show-modal");
        };
        closeButton.addEventListener("click", closeModal);
        if (
          firstRow.every((element) => element.textContent === "x") ||
          secondRow.every((element) => element.textContent === "x") ||
          thirdRow.every((element) => element.textContent === "x") ||
          firstColumn.every((element) => element.textContent === "x") ||
          secondColumn.every((element) => element.textContent === "x") ||
          thirdColumn.every((element) => element.textContent === "x") ||
          firstDiagonal.every((element) => element.textContent === "x") ||
          secondDiagonal.every((element) => element.textContent === "x")
        ) {
          if (playerArray[0]) {
            modalContent.textContent = `${playerArray[0]} Wins!`;
            toggleModal();
          } else if (!playerArray[0]) {
            modalContent.textContent = `Player 1 Wins!`;
            toggleModal();
          }
        } else if (
          firstRow.every((element) => element.textContent === "o") ||
          secondRow.every((element) => element.textContent === "o") ||
          thirdRow.every((element) => element.textContent === "o") ||
          firstColumn.every((element) => element.textContent === "o") ||
          secondColumn.every((element) => element.textContent === "o") ||
          thirdColumn.every((element) => element.textContent === "o") ||
          firstDiagonal.every((element) => element.textContent === "o") ||
          secondDiagonal.every((element) => element.textContent === "o")
        ) {
          if (playerArray[1]) {
            modalContent.textContent = `${playerArray[1]} Wins!`;
            toggleModal();
          } else if (!playerArray[1]) {
            modalContent.textContent = `Player 2 Wins!`;
            toggleModal();
          }
        } else if (gameboardArray.length === 0) {
          modalContent.textContent = "Tie!";
          toggleModal();
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
      gameboardArray = [x, o, x, o, x, o, x, o, x];
      const toggleModal = () => {
        modal.classList.toggle("show-modal");
      };
      const closeModal = () => {
        modal.classList.remove("show-modal");
      };
      closeButton.addEventListener("click", closeModal);
    })();
  });
})();
