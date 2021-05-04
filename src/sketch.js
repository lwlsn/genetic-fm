/*

p5.js sketch, fm-synthesis aquarium. 

Interactive evolutionary algorithm. The fitness is
controlled through how much you interact with each fish. 

Those more interacted with will survive and pass on their genes to the future generations. 

*/


// Global variable 

let fish = [];

let world; 
let populationSize = 20;

let textArray = ["I am a machine", "You can get me to say stuff", "It sure is cold in here", "Did I pass the Turing Test yet?"];
let textP;

let backgroundImg;
let button;
let analyzer; 
let pageCount= 0;

// min/max ranges for modulator
let modMaxFreq = 112;
let modMinFreq = 0;
let modMaxDepth = 150;
let modMinDepth = -150;

let isInitialising = true;


// Add image for the backgroud. 
function preload() {
  backgroundImg = loadImage("assets/background1.jpeg");
}

function setup() {
  createCanvas(800, 600);
  
  //Create a world with x creatures
  world = new World(populationSize);
  
  // Create text box, button for machine feedback
  textP = createP();
  button = createButton('Machine Add Options');
  button.position(100, 650);
  button.mousePressed(updateWorld);
  
  // Create waveform analyser
  analyzer = new p5.FFT(); 
  
  for (let i=0; i< fish.length; i++) {
    fish[i].preSetupFM();
  }

}

function draw() {
  
  if (pageCount == 0) {
    background(49,237,244, 100);
    textAlign(CENTER);
    textSize(45);
    text("FM Synthesis Aquarium", width/4, height/2 - 200, 500, 200);
    textSize(24);
    text("Click on each fish to give it health and to make sound.", width/4, height/2-100, 500, 200);
     text("Higher health leads to better survival chances, and passing on its dna", width/4, height/2, 500, 200);
    text("The machine adds it own suggestions, based on its own preferences", width/4, height/2+100, 500, 200);
    text("Press mouse to begin", width/4, height/2+200, 500, 200);

  }

  else {
    
  image(backgroundImg, 0, 0, width, height);
  
  waveform = analyzer.waveform();
  world.run();
  }
  
}

function updateWorld() {
  textP.html(random(textArray));
  
  let x_ = random(width);
  let y_ = random(height);
  
  world.born(x_, y_ );
}


function mousePressed() {
  world.clicked();
  
   
  pageCount += 1;

}

function mouseReleased() {
   world.released();
}

// Add more random objects by dragging mouse..
// function mouseDragged() {
//   world.born(mouseX, mouseY);
// }