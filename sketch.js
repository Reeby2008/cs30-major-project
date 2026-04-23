// Major Project
// Mehreeb Shahzad
// June

// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const BOX_SIZE = 75;
const GRID_SIZE = BOX_SIZE * 9;
let buttonSize = {
  w: 200,
  h: 75,
  curve: 10
};

function setup() {
  createCanvas(windowWidth, windowHeight);

  homeScreen();
}

function mousePressed() {
  if (mouseX >= width/2 - buttonSize.w/2 && mouseX <= width/2 + buttonSize.w/2 && mouseY >= height/2 - buttonSize.h/2 && mouseY <= height/2 + buttonSize.h/2) {
    gameScreen();
  }
}

function homeScreen() {
  //Display difficulties and play button
  rectMode(CENTER);
  rect(width/2, height/2, buttonSize.w, buttonSize.h, buttonSize.curve, buttonSize.curve, buttonSize.curve, buttonSize.curve);
  rect(width/2, height/2 + buttonSize.w/2, buttonSize.w, buttonSize.h, buttonSize.curve, buttonSize.curve, buttonSize.curve, buttonSize.curve);

  //Display text
  textSize(30);
  textAlign(CENTER, CENTER);
  text("Play", width/2, height/2);
  text("How to Play", width/2, height/2 + buttonSize.w/2);
}

function gameScreen() {
  let gridPos = {
    startX: width/2 - GRID_SIZE/2,
    startY: height/2 - GRID_SIZE/2,
    endX: width/2 + GRID_SIZE/2,
    endY: height/2 + GRID_SIZE/2
  };
  
  clear();
  
  //Display 9x9 grid
  for (let y = gridPos.startY; y < gridPos.endY; y += BOX_SIZE) {
    for (let x = gridPos.startX; x < gridPos.endX; x += BOX_SIZE) {
      strokeWeight(1);
      rectMode(CORNER);
      square(x, y, BOX_SIZE);
      if (x === gridPos.startX * 4 || x === gridPos.startX * 7) {
        strokeWeight(10);
        line(x, gridPos.startY, x, gridPos.endY + BOX_SIZE);
      }
    }
  }
}