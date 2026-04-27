// Major Project
// Mehreeb Shahzad
// June

// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const BOX_SIZE = 75;
const GRID_SIZE = BOX_SIZE * 9;
const BUTTON_SIZE = 150;
let grid = [];
let game = false;
let gameMode = "easy";
let button = {
  x: 200,
  y: 200,
  curve: 10
};
let difficultyButton = {
  x: 726,
  y: 474,
  w: 150,
  h: 75,
  curve: 10,
  offset: 8
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  
  homeScreen();
}

function mousePressed() {
  //Take to game screen if "Play" button is clicked
  if (mouseX >= button.x - BUTTON_SIZE/2 && mouseX <= button.x + BUTTON_SIZE/2 && mouseY >= button.y - BUTTON_SIZE/2 && mouseY <= button.y + BUTTON_SIZE/2) {
    difficulty();
  }
  
  if (game && mouseX >= difficultyButton.x - difficultyButton.w/2 && mouseX <= difficultyButton.x + difficultyButton.w/2 && mouseY >= difficultyButton.y - difficultyButton.h/2 && mouseY <= difficultyButton.y + difficultyButton.h/2) {
    instructions();
  }
}

function homeScreen() {
  //Display difficulties and play button
  rectMode(CENTER);
  square(button.x, button.y, BUTTON_SIZE, button.curve, button.curve, button.curve, button.curve);

  //Display text
  textSize(25);
  textAlign(CENTER, CENTER);
  text("Sudoku", button.x, button.y);
}

function difficulty() {
  clear();

  //Easy button
  rect(difficultyButton.x, difficultyButton.y - difficultyButton.h * 1.5 - difficultyButton.offset/2 - difficultyButton.offset, difficultyButton.w, difficultyButton.h, difficultyButton.curve, difficultyButton.curve, difficultyButton.curve, difficultyButton.curve);
  text("Easy", difficultyButton.x, difficultyButton.y - difficultyButton.h * 1.5 - difficultyButton.offset/2 - difficultyButton.offset);

  //Medium button
  rect(difficultyButton.x, difficultyButton.y - difficultyButton.h/2 - difficultyButton.offset/2, difficultyButton.w, difficultyButton.h, difficultyButton.curve, difficultyButton.curve, difficultyButton.curve, difficultyButton.curve);
  text("Medium", difficultyButton.x, difficultyButton.y - difficultyButton.h/2 - difficultyButton.offset/2);

  //Hard button
  rect(difficultyButton.x, difficultyButton.y + difficultyButton.offset/2 + difficultyButton.h/2, difficultyButton.w, difficultyButton.h, difficultyButton.curve, difficultyButton.curve, difficultyButton.curve, difficultyButton.curve);
  text("Hard", difficultyButton.x, difficultyButton.y + difficultyButton.offset/2 + difficultyButton.h/2);

  //How to play button
  rect(difficultyButton.x, difficultyButton.y + difficultyButton.offset/2 + difficultyButton.offset + difficultyButton.h * 1.5, difficultyButton.w, difficultyButton.h, difficultyButton.curve, difficultyButton.curve, difficultyButton.curve, difficultyButton.curve);
  text("How to Play", difficultyButton.x, difficultyButton.y + difficultyButton.offset/2 + difficultyButton.offset + difficultyButton.h * 1.5);

  circle(width/2, height/2, 2);
  //Display how to play button
  // rect(difficultyButton.x, difficultyButton.y, difficultyButton.w, difficultyButton.h, difficultyButton.curve, difficultyButton.curve, difficultyButton.curve, difficultyButton.curve);
  // text("Hard", difficultyButton.x, difficultyButton.y);
}

function sudokuScreen() {
  let gridPos = {
    startX: width/2 - GRID_SIZE/2,
    startY: height/2 - GRID_SIZE/2,
    endX: width/2 + GRID_SIZE/2,
    endY: height/2 + GRID_SIZE/2
  };
  
  clear();

  //Display 9x9 grid and push x and y coordinates into grid
  for (let y = gridPos.startY; y < gridPos.endY; y += BOX_SIZE) {
    for (let x = gridPos.startX; x < gridPos.endX; x += BOX_SIZE) {
      strokeWeight(1);
      rectMode(CORNER);
      square(x, y, BOX_SIZE);

      //Outline every 3x3 box
      if (x === gridPos.startX + BOX_SIZE * 3 || x === gridPos.startX + BOX_SIZE * 6) {
        strokeWeight(3);
        line(x, gridPos.startY, x, gridPos.endY);
      }
      if (y === gridPos.startY + BOX_SIZE * 3 || y === gridPos.startY + BOX_SIZE * 6) {
        strokeWeight(3);
        line(gridPos.startX, y, gridPos.endX, y);
      }

      grid.push([x, y]);
    }
  }
}

function difficultyAndRules() {
  clear();
  game = true;

  textSize(14);
  text("Each column, row, and 3x3 box should contain the numbers 1-9 exactly once.", width/2, height/2);
}