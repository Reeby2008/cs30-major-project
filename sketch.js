// Major Project
// Mehreeb Shahzad
// Friday, June 12, 2026

// Extra for Experts: HTML/CSS
// - I used both HTML and CSS for some of the visual aspects and buttons of the project, unrelated to actual game mechanics.

//Sudoku home screen button image: AppAdvice.com (permanently shut down?)
//Sound effects: https://pixabay.com/sound-effects/

const BOX_SIZE = 75;
const GRID_SIZE = BOX_SIZE * 9;
const GRID_WIDTH = 9;
const NUMBER_PAD_Y = 850;

let grid = [];
let userInput = [];
let strikeArray = [3, 4, 5];
let currentScreen = "home";
let answer = true;
let easyLayout, mediumLayout, hardLayout, chosenLayout;
let inputX, inputY, changeCols, changeRows;
let correctAnswer, incorrectAnswer, losingSound;
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

function preload() {
  //Load text files as an array of strings
  easyLayout = loadStrings("layouts/easyLayout.txt");
  mediumLayout = loadStrings("layouts/mediumLayout.txt");
  hardLayout = loadStrings("layouts/hardLayout.txt");

  //Load sound effects
  correctAnswer = loadSound("sound-effects/correctAnswer.mp3");
  incorrectAnswer = loadSound("sound-effects/incorrectAnswer.mp3");
  losingSound = loadSound("sound-effects/losingSound.mp3");
  winningSound = loadSound("sound-effects/winningSound.mp3");

  sudokuVisual = loadImage("sudokuLogo.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("times new roman");

  document.getElementById("mainButton").style.display = "block";
}

function mousePressed() {
  //Easy mode
  if (currentScreen === "difficulty" && mouseX >= width/2 - difficultyButton.w/2 && 
                                        mouseX <= width/2 + difficultyButton.w/2 && 
                                        mouseY >= height/2 - difficultyButton.h * 2 - difficultyButton.offset * 1.5 && 
                                        mouseY <= height/2 - difficultyButton.h - difficultyButton.offset * 1.5) {
    setGrid(easyLayout);
  }

  //Medium mode
  if (currentScreen === "difficulty" && mouseX >= width/2 - difficultyButton.w/2 && 
                                        mouseX <= width/2 + difficultyButton.w/2 && 
                                        mouseY >= height/2 - difficultyButton.h - difficultyButton.offset/2 && 
                                        mouseY <= height/2 - difficultyButton.offset/2) {
    setGrid(mediumLayout);
  }

  //Hard mode
  if (currentScreen === "difficulty" && mouseX >= width/2 - difficultyButton.w/2 && 
                                        mouseX <= width/2 + difficultyButton.w/2 && 
                                        mouseY >= height/2 + difficultyButton.offset/2 && 
                                        mouseY <= height/2 + difficultyButton.offset/2 + difficultyButton.h) {
    setGrid(hardLayout);
  }

  //How to play the game
  if (currentScreen === "difficulty" && mouseX >= width/2 - difficultyButton.w/2 && 
                                        mouseX <= width/2 + difficultyButton.w/2 && 
                                        mouseY >= height/2 + difficultyButton.offset * 1.5 + difficultyButton.h && 
                                        mouseY <= height/2 + difficultyButton.offset * 1.5 + difficultyButton.h * 2) {
    difficultyAndRules();
  }

  //Back button
  if (mouseX >= backButton.x && 
      mouseX <= backButton.x + difficultyButton.w && 
      mouseY >= backButton.y && 
      mouseY <= backButton.y + difficultyButton.h) {
    //If current screen is the difficulty screen
    if (currentScreen === "difficulty") {
      homeScreen();
      document.getElementById("mainButton").style.display = "block";
    }

    //If current screen is not the difficulty screen
    if (currentScreen === "game" || currentScreen === "instructions") {
      difficulty();
      document.getElementById("rules").style.display = "none";
    }

    //Set strikes back to normal if user clicks out of game
    strikeArray = [3, 4, 5];
  }

  //Detect which box is clicked and if it's empty or not
  for (let cols = 0; cols < GRID_WIDTH; cols++) {
    for (let rows = 0; rows < GRID_WIDTH; rows++) {
      if (currentScreen === "game" && strikeArray.length !== 0 && userInput[cols][rows] === "0" && mouseX >= grid[cols][rows][0] && 
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
        fill(255, 197, 71);
        noStroke();
        rectMode(CENTER);
        square(inputX, inputY, BOX_SIZE - 1);

        //Draw thicker lines over highlighted box so the box doesn't cover the border
        outlineBoxes();

        strikes();
      }
    }
  }

  //Using numbers on screen
  for (let num = 1; num <= GRID_WIDTH; num++) {
    if (strikeArray.length > 0 && currentScreen === "game" && mouseX >= grid[0][0][0] + BOX_SIZE * (num - 1) && 
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
      //Check if input is correct and update strikes
      if (currentScreen === "game" && key === "" + numbers) {
        checkInput("" + numbers);
        strikes();
      }
  
      //Delete incorrect input using backspace
      if (currentScreen === "game" && keyCode === BACKSPACE) {
        sudokuScreen();
      }
    }
  }
}

function homeScreen() {
  clear();
  currentScreen = "home";

  //Display button
  document.getElementById("mainButton").style.display = "block";
}

function difficulty() {
  clear();
  currentScreen = "difficulty";
  
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
  
  clear();
  currentScreen = "game";
  stroke(brown.r, brown.g, brown.b);
  
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
      
      //Store x and y values in grid array only once
      grid[row].push([x, y]);
    }
    row++;
  }
  outlineBoxes();
  
  //Display input grid
  x = grid[0][0][0];

  for (let cols = 0; cols < GRID_WIDTH; cols++) {
    for (let rows = 0; rows < GRID_WIDTH; rows++) {
      //Display all non-zero numbers
      if (userInput[cols][rows] !== "0") {
        fill(maroon.r, maroon.g, maroon.b);
        noStroke();
        textSize(25);
        text(userInput[cols][rows], grid[cols][rows][0] + BOX_SIZE/2, grid[cols][rows][1] + BOX_SIZE/2);
      }

      //Display number pad
      if (x < BOX_SIZE * 9 + grid[0][0][0]) {
        fill(beige.r, beige.g, beige.b);
        stroke(brown.r, brown.g, brown.b);
        strokeWeight(1);
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

function outlineBoxes() {
  let gridPos = {
    startX: width/2 - GRID_SIZE/2,
    startY: height/2 - GRID_SIZE/2,
    endX: width/2 + GRID_SIZE/2,
    endY: height/2 + GRID_SIZE/2
  };

  //Outline every 3x3 box in the grid
  for (let y = gridPos.startY; y < gridPos.endY; y += BOX_SIZE) {
    for (let x = gridPos.startX; x < gridPos.endX; x += BOX_SIZE) {
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
    }
  }
}

function difficultyAndRules() {
  clear();
  currentScreen = "instructions";
  
  //Display instructions
  document.getElementById("rules").style.display = "block";
  
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

function setGrid(layout) {
  //Store layout in separate array and get rid of potential past layouts played
  chosenLayout = layout;
  userInput.splice(0, GRID_WIDTH);

  //Store new game that is being played
  for (let cols = 0; cols < GRID_WIDTH; cols++) {
    userInput.push([]);
    for (let rows = 0; rows < GRID_WIDTH; rows++) {
      userInput[cols].push(chosenLayout[cols][rows]);
    }
  }
  sudokuScreen();
}

function checkInput(inputValue) {
  if (inputValue === chosenLayout[changeCols + 13][changeRows]) {
    //Create green box if input is correct
    fill("green");
    strokeWeight(1);
    rectMode(CORNER);
    square(grid[changeCols][changeRows][0], grid[changeCols][changeRows][1], BOX_SIZE);
    
    //Update userInput array
    userInput[changeCols][changeRows] = inputValue;

    //Play appropriate sound effect
    correctAnswer.play();
    
    answer = true;
  }
  else {
    //Create red box if input is incorrect
    fill("red");
    strokeWeight(1);
    noStroke();
    rectMode(CORNER);
    square(grid[changeCols][changeRows][0], grid[changeCols][changeRows][1], BOX_SIZE);
    
    //Play appropriate sound effect
    incorrectAnswer.play();
    
    answer = false;
  }
  //Display input
  fill(maroon.r, maroon.g, maroon.b);
  noStroke();
  textSize(25);
  text(inputValue, inputX, inputY);

  outlineBoxes();
}

function strikes() {
  //Display strikes
  for (let x = 0; x < strikeArray.length; x++) {
    fill("green");
    stroke(brown.r, brown.g, brown.b);
    strokeWeight(1);
    circle(grid[0][strikeArray[x]][0] + BOX_SIZE/2, backButton.y + difficultyButton.h/2, 35);
  }

  //Take away strike if input is incorrect
  if (!answer) {
    fill(172, 121, 76);
    noStroke();
    rect(grid[0][strikeArray[0]][0], backButton.y, BOX_SIZE);
    strikeArray.splice(0, 1);
    answer = true;
  }

  //Display loser screen if all strikes are out
  if (strikeArray.length === 0) {
    clear();

    //Display text
    fill(maroon.r, maroon.g, maroon.b);
    textAlign(CENTER);
    textSize(50);
    text("You Lose!", width/2, height/2);

    //Play losing music
    losingSound.play();

    back();
  }
}