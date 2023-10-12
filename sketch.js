let mySound1;
let mySound2;
let mySound3;

let ellipses = [];
let paused = false;
let firstMouseClick = false;
let prevMouseX = 0;
let prevMouseY = 0;
let colorPicker;

let soundSpeedSlider;
let delay1, delay2, delay3; 
let delaySlider;

let mouseMoving = false;
let mouseCheckInterval;

let recorder, soundFile;
let recordingState = 0;

window.addEventListener("keydown", function (e) {
  if (e.key === "s") {
    saveSketch();
  }
});

function preload() {
  mySound1 = loadSound("RullyShabaraSampleR02.wav");
  mySound2 = loadSound("RullyShabaraSampleR04.wav");
  mySound3 = loadSound("RullyShabaraSampleR03.wav");
}


function saveSketch() {
  saveCanvas("XhabarabotBubblepen", "png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(85);

  mySound1.setVolume(0.5);
  mySound1.stop();
  mySound2.setVolume(0.3);
  mySound2.stop();
  mySound3.setVolume(0.4);
  mySound3.stop();

  colorPicker = createColorPicker(color(275, 200, 0));
  colorPicker.position(10, 10);
  
  
    // Sliders for size and speed
  sizeSlider = createSlider(1, 100, 10);
  sizeSlider.position(10, 45);
  sizeSlider.style('width', '100px');
  sizeSlider.addClass('slider');  

  speedSlider = createSlider(1, 100, 10);
  speedSlider.position(10, 75);
  speedSlider.style('width', '100px');
  speedSlider.addClass('slider');  

  soundSpeedSlider = createSlider(0.1, 3.0, 1, 0.1);
  soundSpeedSlider.position(10, 105);
  soundSpeedSlider.style('width', '100px');
  soundSpeedSlider.hide();
  soundSpeedSlider.addClass('slider');  

  // Create a new slider for delay
  delaySlider = createSlider(0, 1, 0.2, 0.01);
  delaySlider.position(10, 135);
  delaySlider.style('width', '100px');
  delaySlider.hide();
  delaySlider.addClass('slider'); 
  
  delay1 = new p5.Delay();
  delay2 = new p5.Delay();
  delay3 = new p5.Delay();
  
  delay1.process(mySound1, .2, .7, 2300);
  delay2.process(mySound2, .2, .7, 2300);
  delay3.process(mySound3, .2, .7, 2300);
  
  
  
  mouseCheckInterval = setInterval(() => {
  if (mouseX !== prevMouseX || mouseY !== prevMouseY) {
    mouseMoving = true;
  } else {
    mouseMoving = false;
  }
  prevMouseX = mouseX;
  prevMouseY = mouseY;
}, 50);

window.onunload = () => {
    clearInterval(mouseCheckInterval);
  };

  recorder = new p5.SoundRecorder();
  soundFile = new p5.SoundFile();
  
  // Connect the recorder to the master output
  recorder.setInput();

  // Add a record button
  recordingButton = createButton('Record');
  recordingButton.mousePressed(toggleRecording);
  recordingButton.position(80, 10);
  recordingButton.addClass('recording-button');

}


  function toggleRecording() {
  if (recordingState === 0) {
    
    recorder.record(soundFile);
    recordingButton.html("Stop Recording");  
    recordingState = 1;
  } else if (recordingState === 1) {
    
    recorder.stop();
    recordingButton.html("Download");  
    recordingState = 2;
  } else if (recordingState === 2) {
    
    saveSound(soundFile, 'XhabarbotBubblepenRecording.wav');
    recordingButton.html("Record");  
    recordingState = 0;
  }
}


function keyPressed() {
  if (key === " ") {
    paused = !paused;
    if (paused) {
      soundSpeedSlider.show();
      delaySlider.show();  // Show the delay slider when paused
    } else {
      soundSpeedSlider.hide();
      delaySlider.hide();  // Hide the delay slider when unpaused
    }
  }
}

function draw() {
  if (paused) {
    
    let newSpeed = soundSpeedSlider.value();
    let newDelay = delaySlider.value();

    mySound1.rate(newSpeed);
    mySound2.rate(newSpeed);
    mySound3.rate(newSpeed);

    delay1.delayTime(newDelay);
    delay2.delayTime(newDelay);
    delay3.delayTime(newDelay);
  } else {
    if (mouseMoving) {
      if (!mySound1.isPlaying()) mySound1.play();
      if (!mySound2.isPlaying()) mySound2.play();
      if (!mySound3.isPlaying()) mySound3.play();

      let randomSound = Math.floor(Math.random() * 3) + 1;
      let randomColor = color(random(155), random(155), random(155));
      let randomShape = Math.floor(Math.random() * 2) + 1;

      if (randomSound === 1) {
        mySound1.rate(map(mouseX, 0, width, 0.1, 2));
        if (mouseIsPressed) {
          mySound1.setVolume(1);
        } else {
          mySound1.setVolume(1);
        }
      } else if (randomSound === 2) {
        mySound2.rate(map(mouseX, 1, width, 0.1, 2));
        if (mouseIsPressed) {
          mySound2.setVolume(1);
        } else {
          mySound2.setVolume(1);
        }
      } else {
        mySound3.rate(map(mouseX, 0, width, 0.1, 2));
        if (mouseIsPressed) {
          mySound3.setVolume(1);
        } else {
          mySound3.setVolume(1);
        }
      }

      stroke(20);
      strokeWeight(1);

      if (randomShape === 1) {
        let speed = dist(mouseX, mouseY, pmouseX, pmouseY) * frameRate();
        let size = map(speed, 20, 1000, 1, sizeSlider.value());
        fill(colorPicker.color());
        ellipse(mouseX, mouseY, size, size);
      } else if (randomShape === 2) {
        fill(colorPicker.color());
        rect(mouseX, mouseY, 3, 3);
      }
    } else {
      mySound1.stop();
      mySound2.stop();
      mySound3.stop();
    }
  }
}
