class Fish {
  constructor(l, dna_, carrieramp) {
    this.pos = l.copy(); //Location
    this.health = 100; //Lifespan of creature
    this.xoff = random(1000); // For perlin noise
    this.yoff = random(1000);
    this.dna = dna_;  // dna controls its shape and sound
    this.maxspeed = map(this.dna.genes[0], 0, 1, 5, 0);
    this.r = 42;
    this.colour= "white";
    this.carrier = new p5.Oscillator(this.dna.genes[4]);
    this.modulator = new p5.Oscillator(this.dna.genes[5]);

  }
  
  
  //  set amplitude to 0 to avoid playing onload.. 
  // preSetupFM() {
    
  // }
  
  // Setup FM Synth, runs once on loading the page
  setupFM() {
    // Carrier function
    this.carrier.amp(0);  
 
  }
  
  // Check when fish-object contains mouse
   contains(mx, my) {
    return dist(mx, my, this.pos.x, this.pos.y) < this.r;
  }
  
  
  // Update the modulation frequency and depth from the dna. 
  updateSound() {

    this.carrier.freq(this.dna.genes[3]); // set frequency
    this.carrier.start(); // start oscillating
    
    //Modulator function
    
    this.modulator.start(); 
  
    
    // Send carrier to modulator
    this.modulator.disconnect();
    this.carrier.freq(this.modulator);

    // modulator frequency determined from genes..
  // let modFreq = map(mouseY, height, 0, modMinFreq, modMaxFreq);
  let modFreq = this.dna.genes[1];
  this.modulator.freq(modFreq);

  // change the amplitude of the modulator
  // negative amp reverses the sawtooth waveform, and sounds percussive
  // modulator depth also determined from genes..
  // let modDepth = map(mouseX, 0, width, modMinDepth, modMaxDepth);
  let modDepth = this.dna.genes[2];
  this.modulator.amp(modDepth);
  }
  

  
  
  //Chance of asexual reproduction
  reproduce() {
    // asexual reproduction
    if (random(1) < 0.0008) {
      // Child is exact copy of single parent
      let childDNA = this.dna.copy();
      // Child DNA can mutate
      childDNA.mutate(mutationRate);
      return new Fish(this.pos, childDNA);
    } else {
      return null;
    }

    
  }

  
  //Update the position
  update() {
    // Simple movement based on perlin noise
    let vx = map(noise(this.xoff), 1, 0, -this.maxspeed, this.maxspeed);
    let vy = map(noise(this.yoff), 0, 1, -this.maxspeed, this.maxspeed);
    let velocity = createVector(vx, vy);
    this.xoff += 0.01;
    this.yoff += 0.01;

    this.pos.add(velocity);
    // Death always looming
    this.health -= 0.15;
  }
  
  
  // Wraparound at the edges of the screen 
  borders() {
    if (this.pos.x < -this.r) this.pos.x = width + this.r;
    if (this.pos.y < -this.r) this.pos.y = height + this.r;
    if (this.pos.x > this.width + this.r) this.pos.x = -r;
    if (this.pos.y > this.height + this.r) this.pos.y = -r;
  }
  
  // Method to display
  display() {

    if (this.contains(mouseX, mouseY)) {
      noStroke(); 
      fill(100, 100, 200); 
    } else {
      
      if (this.dna.genes[4] == "sine") {
        stroke(255,206,0, this.health);
        fill(255,206,0, this.health);
      }
      else if (this.dna.genes[4] == "square") {
        stroke(0,159,255, this.health);
        fill(0,159,255, this.health);
      } else {
        stroke(75,132,108, this.health);
        fill(75,132,108, this.health);
      }
     
    }
    

    if (this.dna.genes[5] == "sine") {
      this.colour = [255,206,0];
    }
    if (this.dna.genes[5] == "square") {
       this.colour = [75,132,108];
     
    }
    if (this.dna.genes[5] == "sawtooth") {
      this.colour = [0,159,255];
    }
    
    
    
     // Tail 
    beginShape();
    strokeWeight(2);
    stroke("white");
    // fill(this.colour);
    curveVertex(this.pos.x-20, this.pos.y);
    curveVertex(this.pos.x-40, this.pos.y-15);
    curveVertex(this.pos.x-30, this.pos.y);
    curveVertex(this.pos.x-40, this.pos.y+20);        
    endShape(CLOSE);
    
    //fin 1
    beginShape();
    strokeWeight(2);
    stroke("white");
    // fill(this.colour);
    curveVertex(this.pos.x-15, this.pos.y+10);
    curveVertex(this.pos.x-15, this.pos.y+12);
    curveVertex(this.pos.x-10, this.pos.y+25);
    curveVertex(this.pos.x-10, this.pos.y+10);        
    endShape(CLOSE);
    
    
    // Connector
    
    strokeWeight(0);
    // fill(this.colour);
    quad(this.pos.x-25, this.pos.y-5, this.pos.x-15, this.pos.y-10, this.pos.x-15, this.pos.y+10, this.pos.x-25, this.pos.y+5);
    
    
    // Body 
    
    if (this.dna.genes[4] == "sine") {
      // fill(255,206,0, this.health);
      ellipse(this.pos.x, this.pos.y, this.r, this.r*(0.75));
      ellipse(this.pos.x+15, this.pos.y+5, this.r*0.65, this.r*0.65);
    
    }
    
    if (this.dna.genes[4] == "square") {
      // fill(this.colour[0], this.color[1], this.color[2], this.health);
      rectMode(CENTER);
      rect(this.pos.x, this.pos.y, this.r, this.r*(0.5));
      ellipse(this.pos.x+15, this.pos.y+5, this.r*0.65, this.r*0.65);
    }
    
    if (this.dna.genes[4] == "sawtooth") {
      // fill(0, this.health);
       triangle(this.pos.x - this.r/2, this.pos.y+ this.r/2, 
               this.pos.x - this.r/2, this.pos.y- this.r/2, 
               this.pos.x + this.r/2, this.pos.y); 
       ellipse(this.pos.x+15, this.pos.y+5, this.r*0.65, this.r*0.65);
    }
   
    
    // mouth
    fill(150, this.health);
    ellipse(this.pos.x+20, this.pos.y+15, this.r*(0.35), this.r*(0.2));
    fill(this.colour[0], this.colour[1], this.colour[2], this.health);
    ellipse(this.pos.x+20, this.pos.y+17, this.r*(0.3), this.r*(0.15));
    
    

    //eye 
    fill(this.colour[0], this.colour[1], this.colour[2]);
    ellipse(this.pos.x+15, this.pos.y+5, this.r*0.2, this.r*0.2 );
    stroke("grey");
    fill("white");
    ellipse(this.pos.x+15, this.pos.y+5, this.r*0.15, this.r*0.15);
    fill("black");
    ellipse(this.pos.x+15, this.pos.y+5, this.r*0.1, this.r*0.1);
    
    // add waveform tail.. display only for each object?
//     beginShape();
//     for (let i = 0; i < waveform.length; i++) {
//       // let x = map(i, 0, waveform.length, this.pos.x, this.pos.x+50);
//       // let y = map(waveform[i], -1, 1, this.pos.y, this.pos.y+20);
      
//       let x = map(i, 0, waveform.length, 0, width);
//       let y = map(waveform[i], -1, 1, 0, height);
//       fill(255, 0.9);
//       vertex(x, y );
//     }
//     endShape();
    
    beginShape();
    for (let i = 0; i < waveform.length; i++) {
      let x = map(i, 0, waveform.length, this.pos.x-50, this.pos.x);
      let y = map(waveform[i], -1, 1, this.pos.y-20, this.pos.y+20);
      vertex(x, y );
    }
    endShape();
   
  }
   
  
  playSound(){
    if (this.contains(mouseX, mouseY)) {
      this.carrier.amp(1, 0.01);
    }
  } 
  
  stopSound() {
    this.carrier.amp(0, 0.01);
  }
  
  // Death :'(
  dead() {
    if (this.health < 0.0) {
      return true;
    } else {
      return false;
    }
  }
  
  // Run the animation. 
   run() {
    this.update();
    this.borders();
    this.display();
  }
  
  
}