// Major Project
// Mehreeb Shahzad
// Friday, June 12, 2026

// Extra for Experts:
// - describe what you did to take this project "above and beyond"
//Sudoku home screen button image from AppAdvice.com (permanently shut down?)

const BOX_SIZE = 75;
const GRID_SIZE = BOX_SIZE * 9;
const GRID_WIDTH = 9;
const BUTTON_SIZE = 150;
const NUMBER_PAD_Y = 850;

let grid = [];
let userInput = [];
let strikeArray = [3, 4, 5];
let game = false;
let backToDifficulty = false;
let backHome = false;
let answer = true;
let easyLayout, mediumLayout, hardLayout, chosenLayout;
let inputX, inputY, changeCols, changeRows;
let sudokuVisual;
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
let orange = {
  r: 255,
  g: 197,
  b: 71
};
let beige = {
  r: 242,
  g: 214,
  b: 179
};
let brown = {
  r: 89,
  g: 58,
  b: 39
};
let maroon = {
  r: 89,
  g: 20,
  b: 20
};
let lightBrown = {
  r: 172,
  g: 121,
  b: 76
}

function preload() {
  //Load text files as strings in an array
  easyLayout = loadStrings("layouts/easyLayout.txt");
  mediumLayout = loadStrings("layouts/mediumLayout.txt");
  hardLayout = loadStrings("layouts/hardLayout.txt");

  sudokuVisual = loadImage("sudokuLogo.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  //Take to difficulty screen
  if (mouseX >= width/2 - sudokuVisual.width/2 && 
      mouseX <= width/2 + sudokuVisual.width/2 && 
      mouseY >= height/2 - sudokuVisual.height/2 && 
      mouseY <= height/2 + sudokuVisual.height/2) {
    difficulty();
  }
  
  //Easy mode
  if (game && mouseX >= width/2 - difficultyButton.w/2 && 
              mouseX <= width/2 + difficultyButton.w/2 && 
              mouseY >= height/2 - difficultyButton.h * 2 - difficultyButton.offset * 1.5 && 
              mouseY <= height/2 - difficultyButton.h - difficultyButton.offset * 1.5) {
    game = false;
    chosenLayout = easyLayout;
    setGrid();
    sudokuScreen();
  }

  //Medium mode
  if (game && mouseX >= width/2 - difficultyButton.w/2 && 
              mouseX <= width/2 + difficultyButton.w/2 && 
              mouseY >= height/2 - difficultyButton.h - difficultyButton.offset/2 && 
              mouseY <= height/2 - difficultyButton.offset/2) {
    game = false;
    chosenLayout = mediumLayout;
    setGrid();
    sudokuScreen();
  }

  //Hard mode
  if (game && mouseX >= width/2 - difficultyButton.w/2 && 
              mouseX <= width/2 + difficultyButton.w/2 && 
              mouseY >= height/2 + difficultyButton.offset/2 && 
              mouseY <= height/2 + difficultyButton.offset/2 + difficultyButton.h) {
    game = false;
    chosenLayout = hardLayout;
    setGrid();
    sudokuScreen();
  }

  //How to play the game
  if (game && mouseX >= width/2 - difficultyButton.w/2 && 
              mouseX <= width/2 + difficultyButton.w/2 && 
              mouseY >= height/2 + difficultyButton.offset * 1.5 + difficultyButton.h && 
              mouseY <= height/2 + difficultyButton.offset * 1.5 + difficultyButton.h * 2) {
    difficultyAndRules();
    game = false;
  }

  //Back button
  if (mouseX >= backButton.x && 
      mouseX <= backButton.x + difficultyButton.w && 
      mouseY >= backButton.y && 
      mouseY <= backButton.y + difficultyButton.h) {
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

    //Set strikes back to normal if user clicks out of game
    strikeArray = [3, 4, 5];
  }

  //Detect which box is clicked and if it's empty or not
  for (let cols = 0; cols < GRID_WIDTH; cols++) {
    for (let rows = 0; rows < GRID_WIDTH; rows++) {
      if (backToDifficulty && userInput[cols][rows] === "0" && mouseX >= grid[cols][rows][0] && 
                                                               mouseX <= grid[cols][rows][0] + BOX_SIZE && 
                                                               mouseY >= grid[cols][rows][1] && 
                                                               mouseY <= grid[cols][rows][1] + BOX_SIZE) {
        //Redraw grid so it gets rid of coloured box
        sudokuScreen();

        //Store x, y, cols, and rows in separate variables
        inputX = grid[cols][rows][0] + BOX_SIZE/2;
        inputY = grid[cols][rows][1] + BOX_SIZE/2;
        changeCols = cols;
        changeRows = rows;

        //Change colour of the square the user clicks on
        fill(orange.r, orange.g, orange.b);
        noStroke();
        rectMode(CENTER);
        square(inputX, inputY, BOX_SIZE - 1);
      }
    }
  }

  //Using numbers on screen
  for (let num = 1; num <= GRID_WIDTH; num++) {
    if (strikeArray.length > 0 && backToDifficulty && mouseX >= grid[0][0][0] + BOX_SIZE * (num - 1) && 
                                                      mouseX <= grid[0][0][0] + BOX_SIZE * num && 
                                                      mouseY >= NUMBER_PAD_Y && 
                                                      mouseY <= NUMBER_PAD_Y + BOX_SIZE) {
      //Check if input is correct
      checkInput("" + num, chosenLayout);
      strikes();
    }
  }
}

function keyPressed() {
  //Inputting numbers into grid
  if (strikeArray.length > 0) {
    for (let numbers = 1; numbers <= GRID_WIDTH; numbers++) {
      if (backToDifficulty && key === "" + numbers) {
        //Check if input is correct
        checkInput("" + numbers);
        strikes();
      }
  
      //Delete incorrect input using backspace
      if (backToDifficulty && keyCode === BACKSPACE) {
        sudokuScreen();
      }
    }
  }
}

function draw() {
  homeScreen();
}

function homeScreen() {
  imageMode(CENTER);
  if (!backHome && mouseX >= width/2 - sudokuVisual.width/2 && 
                   mouseX <= width/2 + sudokuVisual.width/2 && 
                   mouseY >= height/2 - sudokuVisual.height/2 && 
                   mouseY <= height/2 + sudokuVisual.height/2) {
    //If hovering over button, enlarge image
    image(sudokuVisual, width/2, height/2, sudokuVisual.width * 1.1, sudokuVisual.height * 1.1);
  }

  else if (!backHome) {
    //Cover previous buttons
    background(lightBrown.r, lightBrown.g, lightBrown.b);

    //Display Image
    image(sudokuVisual, width/2, height/2, sudokuVisual.width, sudokuVisual.height);
  }
}

function difficulty() {
  clear();
  game = true;
  backHome = true;
  
  //Buttons
  fill(beige.r, beige.g, beige.b);
  strokeWeight(4);
  stroke(brown.r, brown.g, brown.b);
  rectMode(CENTER);
  rect(width/2, height/2 - difficultyButton.h * 1.5 - difficultyButton.offset * 1.5, difficultyButton.w, difficultyButton.h, button.curve);
  rect(width/2, height/2 - difficultyButton.h/2 - difficultyButton.offset/2, difficultyButton.w, difficultyButton.h, button.curve);
  rect(width/2, height/2 + difficultyButton.h/2 + difficultyButton.offset/2, difficultyButton.w, difficultyButton.h, button.curve);
  rect(width/2, height/2 + difficultyButton.offset * 1.5 + difficultyButton.h * 1.5, difficultyButton.w, difficultyButton.h, button.curve);

  //Button texts
  fill(maroon.r, maroon.g, maroon.b);
  noStroke();
  textSize(25);
  textAlign(CENTER);
  text("Easy", width/2, height/2 - difficultyButton.h * 1.5 - difficultyButton.offset * 1.5);
  text("Medium", width/2, height/2 - difficultyButton.h/2 - difficultyButton.offset/2);
  text("Hard", width/2, height/2 + difficultyButton.offset/2 + difficultyButton.h/2);
  text("How to Play", width/2, height/2 + difficultyButton.offset * 1.5 + difficultyButton.h * 1.5);
  back();
}

function sudokuScreen() {
  let row = 0;
  let gridPos = {
    startX: width/2 - GRID_SIZE/2,
    startY: height/2 - GRID_SIZE/2,
    endX: width/2 + GRID_SIZE/2,
    endY: height/2 + GRID_SIZE/2
  };
  grid = [];
  
  clear();
  backToDifficulty = true;
  stroke(brown.r, brown.g, brown.b);
  background(lightBrown.r, lightBrown.g, lightBrown.b);
  
  //Display 9x9 grid and push x and y coordinates into grid array
  for (let y = gridPos.startY; y < gridPos.endY; y += BOX_SIZE) {
    //Add columns only once
    grid.push([]);
    for (let x = gridPos.startX; x < gridPos.endX; x += BOX_SIZE) {
      //Display grid
      fill(beige.r, beige.g, beige.b);
      stroke(brown.r, brown.g, brown.b);
      strokeWeight(1);
      rectMode(CORNER);
      square(x, y, BOX_SIZE);
      
      //Outline every third vertical line
      if (x === gridPos.startX + BOX_SIZE * 3 || x === gridPos.startX + BOX_SIZE * 6) {
        strokeWeight(7);
        stroke(brown.r, brown.g, brown.b);
        line(x, gridPos.startY, x, gridPos.endY);
      }
      
      //Outline every third horizontal line
      if (y === gridPos.startY + BOX_SIZE * 3 || y === gridPos.startY + BOX_SIZE * 6) {
        strokeWeight(7);
        stroke(brown.r, brown.g, brown.b);
        line(gridPos.startX, y, gridPos.endX, y);
      }
      
      //Store x and y values in grid array only once
      grid[row].push([x, y]);
    }
    row++;
  }
  
  //Display input grid
  x = grid[0][0][0];

  for (let cols = 0; cols < GRID_WIDTH; cols++) {
    for (let rows = 0; rows < GRID_WIDTH; rows++) {
      //Display all non-zero numbers
      if (userInput[cols][rows] !== "0") {
        fill(maroon.r, maroon.g, maroon.b);
        noStroke();
        text(userInput[cols][rows], grid[cols][rows][0] + BOX_SIZE/2, grid[cols][rows][1] + BOX_SIZE/2);
      }

      //Display number pad
      if (x < BOX_SIZE * 9 + grid[0][0][0]) {
        fill(beige.r, beige.g, beige.b);
        stroke(brown.r, brown.g, brown.b);
        square(x, NUMBER_PAD_Y, BOX_SIZE);
        
        fill(maroon.r, maroon.g, maroon.b);
        noStroke();
        text(rows + 1, x + BOX_SIZE/2, NUMBER_PAD_Y + BOX_SIZE/2);
        x += BOX_SIZE;
      }
    }
  }

  strikes();
  back();
}

function difficultyAndRules() {
  const YOFFSET = 25;

  clear();
  background(lightBrown.r, lightBrown.g, lightBrown.b);
  
  //Display instructions
  textSize(25);
  textAlign(CENTER);
  text("Each column, row, and 3x3 box should contain the numbers 1-9 exactly once.", width/2, height/2 - 3 * YOFFSET);
  text("Each Sudoku grid comes with a few spaces already filled in;", width/2, height/2 - 2 * YOFFSET);
  text("the more spaces filled in at the beginning, the easier the game.", width/2, height/2 - YOFFSET);
  text("Click on the box you would like to enter a number in, and type in the desired number.", width/2, height/2);
  text("To input your desired number, you can either use your keyboard or use the numbers at the bottom of the screen.", width/2, height/2 + 1 * YOFFSET);
  text("Use backspace to delete an incorrect input.", width/2, height/2 + 2 * YOFFSET);
  text("After 3 incorrect guesses, you lose.", width/2, height/2 + 3 * YOFFSET);
  
  back();
}

function back() {
  //Display the back button
  fill(beige.r, beige.g, beige.b);
  strokeWeight(3);
  stroke(brown.r, brown.g, brown.b);
  rectMode(CORNER);
  rect(backButton.x, backButton.y, difficultyButton.w, difficultyButton.h, button.curve);
  textSize(25);

  fill(maroon.r, maroon.g, maroon.b);
  noStroke();
  textAlign(CENTER);
  text("Back", backButton.x + difficultyButton.w/2, backButton.y + difficultyButton.h/2);
}

function setGrid() {
  //Store layout in separate grid
  userInput.splice(0, GRID_WIDTH);
  for (let cols = 0; cols < GRID_WIDTH; cols++) {
    userInput.push([]);
    for (let rows = 0; rows < GRID_WIDTH; rows++) {
      userInput[cols].push(chosenLayout[cols][rows]);
    }
  }
}

function checkInput(inputValue) {
  if (inputValue === chosenLayout[changeCols + 13][changeRows]) {
    //Create green box if input is correct
    fill("green");
    rectMode(CORNER);
    square(grid[changeCols][changeRows][0], grid[changeCols][changeRows][1], BOX_SIZE);
    
    //Display input
    fill(maroon.r, maroon.g, maroon.b);
    text(inputValue, inputX, inputY);
    textAlign(CENTER);
    userInput[changeCols][changeRows] = inputValue;
    answer = true;
  }
  else {
    //Create red box if input is incorrect
    fill("red");
    rectMode(CORNER);
    square(grid[changeCols][changeRows][0], grid[changeCols][changeRows][1], BOX_SIZE);

    //Display input
    fill(maroon.r, maroon.g, maroon.b);
    text(inputValue, inputX, inputY);
    answer = false;
  }
}

function strikes() {
  //Display strikes
  for (let x = 0; x < strikeArray.length; x++) {
    fill("green");
    stroke(1);
    circle(grid[0][strikeArray[x]][0] + BOX_SIZE/2, backButton.y + difficultyButton.h/2, 35);
  }

  //Take away strike if input is incorrect
  if (!answer) {
    fill(lightBrown.r, lightBrown.g, lightBrown.b);
    noStroke();
    rect(grid[0][strikeArray[0]][0], backButton.y, BOX_SIZE);
    strikeArray.splice(0, 1);
    answer = true;
  }

  //Display loser screen if all strikes are out
  if (strikeArray.length === 0) {
    fill(maroon.r, maroon.g, maroon.b);
    textAlign(CENTER);
    text("You Lose!", grid[0][4][0] + BOX_SIZE/2, backButton.y + difficultyButton.h/2);
  }
}