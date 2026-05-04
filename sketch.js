// Major Project
// Mehreeb Shahzad
// June

// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const BOX_SIZE = 75;
const GRID_SIZE = BOX_SIZE * 9;
const GRID_WIDTH = 9;
const BUTTON_SIZE = 150;
let grid = [];
let game = false;
let backToDifficulty = false;
let backHome = false;
let gameMode = "easy";
let easyLayout;
let button = {
  x: 200,
  y: 200,
  curve: 10
};
let difficultyButton = {
  w: 200,
  h: 75,
  offset: 15
};
let backButton = {
  x: 50,
  y: 50
};

function preload() {
  easyLayout = loadStrings("layouts/easyLayout.txt");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  homeScreen();
}

function mousePressed() {
  //Take to game screen if "Play" button is clicked
  if (mouseX >= button.x - BUTTON_SIZE/2 && mouseX <= button.x + BUTTON_SIZE/2 && mouseY >= button.y - BUTTON_SIZE/2 && mouseY <= button.y + BUTTON_SIZE/2) {
    difficulty();
  }
  
  //Easy mode
  if (game && mouseX >= width/2 - difficultyButton.w/2 && mouseX <= width/2 + difficultyButton.w/2 && mouseY >= height/2 - difficultyButton.h * 2 - difficultyButton.offset * 1.5 && mouseY <= height/2 - difficultyButton.h - difficultyButton.offset * 1.5) {
    sudokuScreen();
    game = false;
  }

  //Medium mode
  if (game && mouseX >= width/2 - difficultyButton.w/2 && mouseX <= width/2 + difficultyButton.w/2 && mouseY >= height/2 - difficultyButton.h - difficultyButton.offset/2 && mouseY <= height/2 - difficultyButton.offset/2) {
    sudokuScreen();
    game = false;
  }

  //Hard mode
  if (game && mouseX >= width/2 - difficultyButton.w/2 && mouseX <= width/2 + difficultyButton.w/2 && mouseY >= height/2 + difficultyButton.offset/2 && mouseY <= height/2 + difficultyButton.offset/2 + difficultyButton.h) {
    sudokuScreen();
    game = false;
  }

  //How to play the game
  if (game && mouseX >= width/2 - difficultyButton.w/2 && mouseX <= width/2 + difficultyButton.w/2 && mouseY >= height/2 + difficultyButton.offset * 1.5 + difficultyButton.h && mouseY <= height/2 + difficultyButton.offset * 1.5 + difficultyButton.h * 2) {
    difficultyAndRules();
    game = false;
  }

  //Back button
  if (mouseX >= backButton.x && mouseX <= backButton.x + difficultyButton.w && mouseY >= backButton.y && mouseY <= backButton.y + difficultyButton.h) {
    //If current screen is no the difficulty screen
    if (backHome) {
      clear();
      homeScreen();
      backHome = false;
    }

    //If current screen is the difficulty screen
    if (backToDifficulty) {
      difficulty();
      backToDifficulty = false;
    }
  }
}

function homeScreen() {
  //Display difficulties and play button
  rectMode(CENTER);
  square(button.x, button.y, BUTTON_SIZE, button.curve);

  //Display text
  textSize(25);
  textAlign(CENTER, CENTER);
  text("Sudoku", button.x, button.y);
}

function difficulty() {
  clear();
  game = true;
  backHome = true;
  
  //Easy button
  rectMode(CENTER);
  rect(width/2, height/2 - difficultyButton.h * 1.5 - difficultyButton.offset * 1.5, difficultyButton.w, difficultyButton.h, button.curve);
  text("Easy", width/2, height/2 - difficultyButton.h * 1.5 - difficultyButton.offset * 1.5);

  //Medium button
  rect(width/2, height/2 - difficultyButton.h/2 - difficultyButton.offset/2, difficultyButton.w, difficultyButton.h, button.curve);
  text("Medium", width/2, height/2 - difficultyButton.h/2 - difficultyButton.offset/2);

  //Hard button
  rect(width/2, height/2 + difficultyButton.offset/2 + difficultyButton.h/2, difficultyButton.w, difficultyButton.h, button.curve);
  text("Hard", width/2, height/2 + difficultyButton.offset/2 + difficultyButton.h/2);

  //How to play button
  rect(width/2, height/2 + difficultyButton.offset * 1.5 + difficultyButton.h * 1.5, difficultyButton.w, difficultyButton.h, button.curve);
  text("How to Play", width/2, height/2 + difficultyButton.offset * 1.5 + difficultyButton.h * 1.5);

  back();
}

function sudokuScreen() {
  let gridPos = {
    startX: width/2 - GRID_SIZE/2,
    startY: height/2 - GRID_SIZE/2,
    endX: width/2 + GRID_SIZE/2,
    endY: height/2 + GRID_SIZE/2
  };

  clear();
  backToDifficulty = true;

  //Display 9x9 grid and push x and y coordinates into grid
  for (let y = gridPos.startY; y < gridPos.endY; y += BOX_SIZE) {
    for (let x = gridPos.startX; x < gridPos.endX; x += BOX_SIZE) {
      //Display grid
      strokeWeight(1);
      rectMode(CORNER);
      square(x, y, BOX_SIZE);

      //Outline every third vertical line
      if (x === gridPos.startX + BOX_SIZE * 3 || x === gridPos.startX + BOX_SIZE * 6) {
        strokeWeight(3);
        line(x, gridPos.startY, x, gridPos.endY);
      }

      //Outline every third horizontal line
      if (y === gridPos.startY + BOX_SIZE * 3 || y === gridPos.startY + BOX_SIZE * 6) {
        strokeWeight(3);
        line(gridPos.startX, y, gridPos.endX, y);
      }

      //Only push x and y values once
      if (grid.length < 81) {
        grid.push([x, y]);
      }
      
    }
  }
  
  //Display text file
  for (let cols = 0; cols < GRID_WIDTH; cols++) {
    for (let rows = 0; rows < GRID_WIDTH; rows++) {
      text(easyLayout[cols][rows], grid[rows][0], grid[cols][1]);
    }
  }

  back();
}

function difficultyAndRules() {
  clear();
  backToDifficulty = true;
  
  //Instructions
  textSize(14);
  text("Each column, row, and 3x3 box should contain the numbers 1-9 exactly once.", width/2, height/2);
  
  back();
}

function back() {
  //Display the back button
  rectMode(CORNER);
  rect(backButton.x, backButton.y, difficultyButton.w, difficultyButton.h, button.curve);
  textSize(25);
  text("Back", backButton.x + difficultyButton.w/2, backButton.y + difficultyButton.h/2);
}