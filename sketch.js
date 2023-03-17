let mySound1;
let mySound2;
let mySound3;

let ellipses = [];
let paused = true;
let colorPicker;
let activateButton;

function preload() {
  mySound1 = loadSound("RullyShabaraSampleR02.wav");
  mySound2 = loadSound("RullyShabaraSampleR04.wav");
  mySound3 = loadSound("RullyShabaraSampleR03.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(105);

  colorPicker = createColorPicker(color(255, 0, 0));
  colorPicker.position(10, 10);

  activateButton = createButton('Activate / Reset');
  activateButton.position(70, 15);
  activateButton.mousePressed(toggleSketch);
}

function toggleSketch() {
  paused = !paused;
  if (paused) {
    background(105);
    ellipses = [];
    mySound1.pause();
    mySound2.pause();
    mySound3.pause();
  } else {
    mySound1.loop();
    mySound2.loop();
    mySound3.loop();
  }
}

function keyPressed() {
  if (key === " ") {
    paused = !paused;
  }
}

function draw() {
  if (!paused) {
    let randomSound = Math.floor(Math.random() * 3) + 1;

    if (randomSound === 1) {
      mySound1.rate(map(mouseX, 0, width, 1.5, 0.5));
    } else if (randomSound === 2) {
      mySound2.rate(map(mouseX, 0, width, 1, 0.2));
    } else {
      mySound3.rate(map(mouseX, 0, width, 0.2, 10));
    }

    if (mouseIsPressed === true) {
      mySound1.setVolume(44);
      mySound2.setVolume(120);
      mySound3.setVolume(110);
    } else {
      mySound1.setVolume(15);
      mySound2.setVolume(15);
      mySound3.setVolume(15);
    }

    let speed = dist(mouseX, mouseY, pmouseX, pmouseY);
    let size = map(speed, 40, 100, 20, 50);

    ellipses.push({
      x: mouseX,
      y: mouseY,
      size: size,
      fill: colorPicker.color()
    });

    for (let i = 0; i < ellipses.length; i++) {
      let ellipseDistance = dist(mouseX, mouseY, ellipses[i].x, ellipses[i].y);
      let transparency = map(ellipseDistance, 15, 900, 255, 100);

      fill(ellipses[i].fill, transparency);
      stroke(0);
      ellipse(ellipses[i].x, ellipses[i].y, ellipses[i].size, ellipses[i].size);

      ellipses[i].fill.setAlpha(transparency);
    }
  }
}

function saveSketch() {
  saveCanvas("mySketch", "png");
}

window.addEventListener("keydown", function (e) {
  if (e.key === "s") {
    saveSketch();
  }
});
