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
let userInput = [];
let game = false;
let backToDifficulty = false;
let backHome = false;
let input = false;
let gameMode = "easy";
let easyLayout, mediumLayout, hardLayout;
let inputX, inputY, changeCols, changeRows;
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
      input = false;
    }

    //If current screen is the difficulty screen
    if (backToDifficulty) {
      difficulty();
      backToDifficulty = false;
    }
  }

  //Detect which box is clicked and if it's empty or not
  for (let cols = 0; cols < GRID_WIDTH; cols++) {
    for (let rows = 0; rows < GRID_WIDTH; rows++) {
      if (backToDifficulty && userInput[cols][rows] === "0" && mouseX >= grid[cols][rows][0] && mouseX <= grid[cols][rows][0] + BOX_SIZE && mouseY >= grid[cols][rows][1] && mouseY <= grid[cols][rows][1] + BOX_SIZE) {
        inputX = grid[cols][rows][0] + BOX_SIZE/2;
        inputY = grid[cols][rows][1] + BOX_SIZE/2;
        changeCols = cols;
        changeRows = rows;
        input = true;
      }
    }
  }
}

function keyPressed() {
  //Inputting numbers into grid
  for (let numbers = 1; numbers <= GRID_WIDTH; numbers++) {
    if (input && key === "" + numbers) {
      //If any numbers present, hide it behind a box
      noStroke();
      fill("white");
      rectMode(CENTER);
      square(inputX, inputY, 25);

      //Display inputted number
      fill("black");
      textSize(25);
      text("" + numbers, inputX, inputY);

      //Change array according to the number the user inputs
      userInput[changeCols][changeRows] = "" + numbers;
      checkInput(changeCols, changeRows);
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
  
  //Buttons
  fill("white");
  stroke("black");
  rectMode(CENTER);
  rect(width/2, height/2 - difficultyButton.h * 1.5 - difficultyButton.offset * 1.5, difficultyButton.w, difficultyButton.h, button.curve);
  rect(width/2, height/2 - difficultyButton.h/2 - difficultyButton.offset/2, difficultyButton.w, difficultyButton.h, button.curve);
  rect(width/2, height/2 + difficultyButton.offset/2 + difficultyButton.h/2, difficultyButton.w, difficultyButton.h, button.curve);
  rect(width/2, height/2 + difficultyButton.offset * 1.5 + difficultyButton.h * 1.5, difficultyButton.w, difficultyButton.h, button.curve);

  //Button texts
  fill("black");
  noStroke();
  text("Easy", width/2, height/2 - difficultyButton.h * 1.5 - difficultyButton.offset * 1.5);
  text("Medium", width/2, height/2 - difficultyButton.h/2 - difficultyButton.offset/2);
  text("Hard", width/2, height/2 + difficultyButton.offset/2 + difficultyButton.h/2);
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
  stroke("black");

  let row = 0;
  //Display 9x9 grid and push x and y coordinates into grid
  for (let y = gridPos.startY; y < gridPos.endY; y += BOX_SIZE) {
    grid.push([]);
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
        grid[row].push([x, y]);
      }
    }
    row++;
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
  text("Each column, row, and 3x3 box should contain the numbers 1-9 exactly once.", width/2, height/2 - 2 * YOFFSET);
  text("each Sudoku grid comes with a few spaces already filled in;", width/2, height/2 - YOFFSET);
  text("the more spaces filled in, the easier the game.", width/2, height/2);
  text("The more difficult Sudoku puzzles have very few spaces that are already filled in.", width/2, height/2 + YOFFSET);
  text("Click on the box you would like to enter a number in, and type in the desired number.", width/2, height/2 + 2 * YOFFSET);
  
  back();
}

function back() {
  //Display the back button
  fill("white");
  stroke("black");
  rectMode(CORNER);
  rect(backButton.x, backButton.y, difficultyButton.w, difficultyButton.h, button.curve);
  textSize(25);

  fill("black");
  noStroke();
  text("Back", backButton.x + difficultyButton.w/2, backButton.y + difficultyButton.h/2);
}

function easySudoku() {
  //If user clicked previous difficulties, delete from the array
  userInput.splice(0, 9);
  
  //Display text file/layout
  for (let cols = 0; cols < GRID_WIDTH; cols++) {
    userInput.push([]);
    for (let rows = 0; rows < GRID_WIDTH; rows++) {
      //Don't display the zeroes from text file
      if (easyLayout[cols][rows] !== "0") {
        fill("black");
        noStroke();
        text(easyLayout[cols][rows], grid[cols][rows][0] + BOX_SIZE/2, grid[cols][rows][1] + BOX_SIZE/2);
      }
      userInput[cols].push(easyLayout[cols][rows]);
    }
  }
}

function mediumSudoku() {
  //If user clicked previous difficulties, delete from the array
  userInput.splice(0, 9);

  //Display text file/layout
  for (let cols = 0; cols < GRID_WIDTH; cols++) {
    userInput.push([]);
    for (let rows = 0; rows < GRID_WIDTH; rows++) {
      //Don't display the zeroes from text file
      if (mediumLayout[cols][rows] !== "0") {
        fill("black");
        noStroke();
        text(mediumLayout[cols][rows], grid[cols][rows][0] + BOX_SIZE/2, grid[cols][rows][1] + BOX_SIZE/2);
      }
      userInput[cols].push(mediumLayout[cols][rows]);
    }
  }
}

function hardSudoku() {
  //If user clicked previous difficulties, delete from the array
  userInput.splice(0, 9);

  //Display text file/layout
  for (let cols = 0; cols < GRID_WIDTH; cols++) {
    userInput.push([]);
    for (let rows = 0; rows < GRID_WIDTH; rows++) {
      //Don't display the zeroes from text file
      if (hardLayout[cols][rows] !== "0") {
        fill("black");
        noStroke();
        text(hardLayout[cols][rows], grid[cols][rows][0] + BOX_SIZE/2, grid[cols][rows][1] + BOX_SIZE/2);
      }
      userInput[cols].push(hardLayout[cols][rows]);
    }
  }
}

function checkInput(locationX, locationY) {
  for (let y = 0; y < GRID_WIDTH; y++) {
    if (userInput[locationX][y] === userInput[locationX][locationY] && y !== locationY) {
      // fill("red");
      // square(grid[locationX][locationY][0], grid[locationX][locationY][1], BOX_SIZE);
      console.log("wrong");
    }
    else {
      console.log("right");
    }
  }
  // for (let x = 0; x < GRID_WIDTH; x++) {
  // }
}