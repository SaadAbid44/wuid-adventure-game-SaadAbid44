const scene1 = document.getElementById("scene-1");
const scene2 = document.getElementById("scene-2");
const scene3 = document.getElementById("scene-3");
const text1 = document.getElementById("scene1text");
const text2 = document.getElementById("scene2text");
const text3 = document.getElementById("scene3text");
const cave1 = document.getElementById("cave1");
const cave2 = document.getElementById("cave2");
const key = document.getElementById("key");
const map = document.getElementById("map");
const compass = document.getElementById("compass");
const puzzleKey = document.getElementById("puzzle-key");
const puzzleMap = document.getElementById("puzzle-map");
const puzzleCompass = document.getElementById("puzzle-compass");

// variable to store the game status if gameOver then user cant play anymore
var gameOver = false;

const caves = [cave1, cave2];

// using math.random to make a deadend cave.

// Next lines for assigning was learned from w3school.com

const randomIndex = Math.floor(Math.random() * caves.length);
const gameOverCave = caves[randomIndex];

// Items

const items = [key, map, compass];
const collectedItems = [];

let retrivedItems = [];

// click handlers for caves
cave1.addEventListener("click", () => handleCaveClick(cave1));
cave2.addEventListener("click", () => handleCaveClick(cave2));

function handleCaveClick(cave) {
  // if game is not over then we will check if it is right cave or wrong cave
  if (gameOver == false) {
    if (cave === gameOverCave) {
      // textcontent property was also learned from w3school.com.

      text1.textContent =
        "Game Over! you have chosen the cave of dragon, please reload the game.";

      // setting gameover if true

      gameOver = true;
    } else {
      // scene chanage

      scene1.style.display = "none";
      scene2.style.display = "block";
    }
  }
}

// click handlers for items to collect from the cave
key.addEventListener("click", () => handleItemClick(key));
map.addEventListener("click", () => handleItemClick(map));
compass.addEventListener("click", () => handleItemClick(compass));

function handleItemClick(item) {
  item.style.display = "none";

  // pushing collected item in array.
  collectedItems.push(item.id);
  localStorage.setItem("collectedItems", JSON.stringify(collectedItems));

  //

  // heading   game pickups
  text2.textContent = "Items Picked: " + collectedItems.join(", ");

  // scene cahnge from 2 to 3
  if (collectedItems.length == 3) {
    scene2.style.display = "none";
    scene3.style.display = "block";

    // local storage retreival + heading results
    retrivedItems = JSON.parse(localStorage.getItem("collectedItems"));
    text3.textContent = "Put the items with same order you collected ";
  }
}

// surprise memory puzzle hhhhhhh

puzzleKey.addEventListener("click", () => tryMovePuzzlePiece("key"));
puzzleMap.addEventListener("click", () => tryMovePuzzlePiece("map"));
puzzleCompass.addEventListener("click", () => tryMovePuzzlePiece("compass"));

let currentPuzzleIndex = 0;

function tryMovePuzzlePiece(item) {
  if (gameOver == false) {
    // if the clicked item matched with item on index of array move to next index
    if (retrivedItems[currentPuzzleIndex] === item) {
      currentPuzzleIndex++;

      // instruction
      text3.textContent =
        "Now click on remaining peices to collect the treasure. ";

      // setting gameover after all items collected

      if (currentPuzzleIndex === retrivedItems.length) {
        text3.textContent = "you solved the puzzle and looted treasure.";
        gameOver = true;
      }

      // if wrong piece is selected ending game.
    } else {
      text3.textContent = "the dragon is alerted and you lost";
      gameOver = true;
    }
  }
}
