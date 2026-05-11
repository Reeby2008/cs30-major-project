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
let easyLayout, mediumLayout, hardLayout;
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
  mediumLayout = loadStrings("layouts/mediumLayout.txt");
  hardLayout = loadStrings("layouts/hardLayout.txt");
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
    game = false;
    gameMode = "easy";
    sudokuScreen();
  }

  //Medium mode
  if (game && mouseX >= width/2 - difficultyButton.w/2 && mouseX <= width/2 + difficultyButton.w/2 && mouseY >= height/2 - difficultyButton.h - difficultyButton.offset/2 && mouseY <= height/2 - difficultyButton.offset/2) {
    game = false;
    gameMode = "medium";
    sudokuScreen();
  }

  //Hard mode
  if (game && mouseX >= width/2 - difficultyButton.w/2 && mouseX <= width/2 + difficultyButton.w/2 && mouseY >= height/2 + difficultyButton.offset/2 && mouseY <= height/2 + difficultyButton.offset/2 + difficultyButton.h) {
    game = false;
    gameMode = "hard";
    sudokuScreen();
  }

  //How to play the game
  if (game && mouseX >= width/2 - difficultyButton.w/2 && mouseX <= width/2 + difficultyButton.w/2 && mouseY >= height/2 + difficultyButton.offset * 1.5 + difficultyButton.h && mouseY <= height/2 + difficultyButton.offset * 1.5 + difficultyButton.h * 2) {
    difficultyAndRules();
    game = false;
  }

  //Back button
  if (mouseX >= backButton.x && mouseX <= backButton.x + difficultyButton.w && mouseY >= backButton.y && mouseY <= backButton.y + difficultyButton.h) {
    //If current screen is not the difficulty screen
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

  //Detect which box is clicked and if it's empty or not
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (easyLayout[i] === "0" && mouseX >= grid[i][0] && mouseX <= grid[i][0] + BOX_SIZE && mouseY >= grid[i][1] && mouseY <= grid[i][1] + BOX_SIZE) {
        fill("black");
        square(grid[i][0], grid[i][1], BOX_SIZE);
      }
    }
  }
}

function homeScreen() {
  //Display difficulties and play button
  fill("white");
  rectMode(CENTER);
  square(button.x, button.y, BUTTON_SIZE, button.curve);

  //Display text
  fill("black");
  textSize(25);
  textAlign(CENTER, CENTER);
  text("Sudoku", button.x, button.y);
}

function difficulty() {
  clear();
  game = true;
  backHome = true;
  
  //Easy button
  fill("white");
  rectMode(CENTER);
  rect(width/2, height/2 - difficultyButton.h * 1.5 - difficultyButton.offset * 1.5, difficultyButton.w, difficultyButton.h, button.curve);

  fill("black");
  text("Easy", width/2, height/2 - difficultyButton.h * 1.5 - difficultyButton.offset * 1.5);

  //Medium button
  fill("white");
  rect(width/2, height/2 - difficultyButton.h/2 - difficultyButton.offset/2, difficultyButton.w, difficultyButton.h, button.curve);

  fill("black");
  text("Medium", width/2, height/2 - difficultyButton.h/2 - difficultyButton.offset/2);

  //Hard button
  fill("white");
  rect(width/2, height/2 + difficultyButton.offset/2 + difficultyButton.h/2, difficultyButton.w, difficultyButton.h, button.curve);

  fill("black");
  text("Hard", width/2, height/2 + difficultyButton.offset/2 + difficultyButton.h/2);

  //How to play button
  fill("white");
  rect(width/2, height/2 + difficultyButton.offset * 1.5 + difficultyButton.h * 1.5, difficultyButton.w, difficultyButton.h, button.curve);

  fill("black");
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
      fill("white");
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
  
  //Display appropriate layout based on difficulty selected
  if (gameMode === "easy") {
    easySudoku();
  }
  else if (gameMode === "medium") {
    mediumSudoku();
  }
  else {
    hardSudoku();
  }

  back();
}

function difficultyAndRules() {
  const YOFFSET = 25;

  clear();
  backToDifficulty = true;
  
  //Instructions
  textSize(25);
  text("Each column, row, and 3x3 box should contain the numbers 1-9 exactly once.", width/2, height/2);
  text("each Sudoku grid comes with a few spaces already filled in;", width/2, height/2 + YOFFSET);
  text("the more spaces filled in, the easier the game.", width/2, height/2 + YOFFSET * 2);
  text("The more difficult Sudoku puzzles have very few spaces that are already filled in.", width/2, height/2 + YOFFSET * 3);
  
  back();
}

function back() {
  //Display the back button
  fill("white");
  rectMode(CORNER);
  rect(backButton.x, backButton.y, difficultyButton.w, difficultyButton.h, button.curve);
  textSize(25);

  fill("black");
  text("Back", backButton.x + difficultyButton.w/2, backButton.y + difficultyButton.h/2);
}

function easySudoku() {
  let y = 0;
  
  //Display text file/layout
  for (let cols = 0; cols < GRID_WIDTH; cols++) {
    for (let rows = 0; rows < GRID_WIDTH; rows++) {
      //Don't display the zeroes from text file
      if (easyLayout[cols][rows] !== "0") {
        fill("black");
        text(easyLayout[cols][rows], grid[rows][0] + BOX_SIZE/2, grid[y][1] + BOX_SIZE/2);
      }
    }
    y += 9;
  }
}

function mediumSudoku() {
  let y = 0;

  //Display text file/layout
  for (let cols = 0; cols < GRID_WIDTH; cols++) {
    for (let rows = 0; rows < GRID_WIDTH; rows++) {
      //Don't display the zeroes from text file
      if (mediumLayout[cols][rows] !== "0") {
        fill("black");
        text(mediumLayout[cols][rows], grid[rows][0] + BOX_SIZE/2, grid[y][1] + BOX_SIZE/2);
      }
    }
    y += 9;
  }
}

function hardSudoku() {
  let y = 0;

  //Display text file/layout
  for (let cols = 0; cols < GRID_WIDTH; cols++) {
    for (let rows = 0; rows < GRID_WIDTH; rows++) {
      //Don't display the zeroes from text file
      if (hardLayout[cols][rows] !== "0") {
        fill("black");
        text(hardLayout[cols][rows], grid[rows][0] + BOX_SIZE/2, grid[y][1] + BOX_SIZE/2);
      }
    }
    y += 9;
  }
}