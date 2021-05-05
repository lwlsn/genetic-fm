// probabilities of new type, based on the sentiment analyses
let probsUnstd = [0.996, 0.895, 0.824]; 

// Standardise probabilities .. total = 1.
let total = probsUnstd.reduce(function(a, b){
        return a + b;
    }, 0);

let probs = [probsUnstd[0]/total, probsUnstd[1]/total, probsUnstd[2]/total ];
 

// The world in which the creatures will live..

class World {
  
  constructor(num) {
    fish = [];
    for (let i=0; i< num; i++) {
      let l = createVector(random(width), random(height));
      let dna = new DNA();
    
      fish.push(new Fish(l, dna));
    }
  }
  
  // Make a new creature..
   born(x,y) {
     
    let l = createVector(x, y);
  
    
    let rand = random(1);
    let dna_;
    
    if (rand <  probs[0]){
      // DNA 1
      dna_ = new DNA([random(0, 1), // move speed 
                    random(0,40), // mod Frequency 
                    random(-150, -50), // mod Depth
                    random(40, 440), // frequency scope 
                      "sawtooth", "sine"]);
    }
    else if (rand > probs[0] && rand < probs[0] + probs[1]) {
      // DNA 2
       dna_ = new DNA([random(0, 1), // move speed
                    random(40, 80), // mod frequency
                    random(-50, 50), // mod depth
                    random(40, 440), // frequency scope..  
                    "sine", "square"]);
    }
    else if (rand > probs[0] + probs[1]) {
      // DNA 3
      dna_ = new DNA([random(0, 1), // move speed
                     random(80, 120), // mod frequency
                     random(50,150), // mod depth
                     random(40, 440), // frequency scope
                     "sine", "sine"]);
    }
   
    fish.push(new Fish(l, dna_));
     

     
   // Avoid triggering new sound on new fish added.
    for (let i=0; i< fish.length; i++) {
      fish[i].carrier.amp(0);
    }  
    
  }
  
  
  
    // When clicked increase each object's "counter", for fitness.
  clicked() {
  
    let iterationLength;
    if (fish.length == null) {
      iterationLength = populationSize
    }
    else {
      iterationLength = fish.length;
    }
    
  for (let i =0; i < iterationLength; i++){
    // let d = dist(fish[i].pos.x, fish[i].pos.y, mouseX, mouseY );
    
    if ( fish[i].contains(mouseX, mouseY) ) {
      fish[i].health += 10;
      // console.log("Health added");
      
      fish[i].playSound(); 
      fish[i].updateSound();
    
      }
    
    }
       
  }
  
  released() {
    
    let iterationLength;
    if (fish.length == null) {
      iterationLength = populationSize
    }
    else {
      iterationLength = fish.length;
    }
    
    for (let i=0; i< iterationLength; i++) {
      fish[i].stopSound();
    }
  }
  
  run() {
    
    for (let i= fish.length-1; i >= 0; i--) {
      let f = fish[i];
      // f.setupFM();
      f.run();
      // when dead, remove from the world. 
      if (f.dead()) {
        fish.splice(i,1);
      }
  
      
      //make a child 
      let child = f.reproduce();
      if (child != null) fish.push(child);

      
    }
    
  }
  
}