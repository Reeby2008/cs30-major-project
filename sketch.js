// Major Project
// Mehreeb Shahzad
// June

// Extra for Experts:
// - describe what you did to take this project "above and beyond"

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
  rect(width/2, height/2 + 100, buttonSize.w, buttonSize.h, buttonSize.curve, buttonSize.curve, buttonSize.curve, buttonSize.curve);

  //Display text
  textSize(30);
  textAlign(CENTER, CENTER);
  text("Play", width/2, height/2);
  text("How to Play", width/2, height/2 + 100);
}

function gameScreen() {
  //Display 9x9 grid
}