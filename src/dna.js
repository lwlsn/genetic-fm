let oscillatorType = ["square", "sine", "sawtooth"];


class DNA {
  constructor(newgenes) {
    if (newgenes) {
      this.genes = newgenes;
    } else {
      this.genes = new Array(2);

      this.genes = [random(0, 1), // Fish move speed 
        random(0, 112), // modulation frequency
        random(-150, 150), // modulation depth
        random(110, 440), // frequency scope..  
        random(oscillatorType), //carrier osc
        random(oscillatorType), // mod osc
      ];

      // console.log(this.genes);
    }
  }

  copy() {
    let newgenes = [];
    for (let i = 0; i < this.genes.length; i++) {
      newgenes[i] = this.genes[i];
    }

    return new DNA(newgenes);
  }


  // Based on a mutation probability, picks a new random character in array spots
  mutate(m) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < m) {
        this.genes[i] = random(0, 1);
      }
    }
  }

  

}