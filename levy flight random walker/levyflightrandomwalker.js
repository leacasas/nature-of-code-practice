// jshint ignore: start
var walkers = [];
var limit = 500;

function setup() {
    createCanvas(1360, 662);
    for(var i = 0; i < limit; i++) {
        walkers.push(new Walker());
    }
}

function draw() {
    background('rgba(200, 200, 200, 0.025)');
    for(var i = 0; i < limit; i++) {
        walkers[i].step();
        walkers[i].display();
    }
}

function montecarlo() {
    while(true) {
        var r1 = random(1);
        var probability = pow(1.0 - r1, 8);
        if(random(1) < probability)
            return r1;
    }
}

var Walker = function() {
  this.x = int(random(width / 4, 3 * width / 4));
  this.y = height/2;
  this.prevx = 0;
  this.prevy = 0;
  this.c = 'rgb(' + int(random(0, 255)) + ', ' + int(random(0, 255)) + ', ' + int(random(0, 255)) + ')';
};

Walker.prototype.step = function() {
    this.prevx = this.x;
    this.prevy = this.y;

    var stepx = random(-1, 1);
    var stepy = random(-1, 1);

    var stepsize = montecarlo() * 50;
    stepx *= stepsize;
    stepy *= stepsize;

    this.x += stepx;
    this.y += stepy;

    this.x = constrain(this.x, 0, width - 1);
    this.y = constrain(this.y, 0, height - 1);
};
  
Walker.prototype.display = function() {
  stroke(this.c);
  strokeWeight(3);
  line(this.prevx, this.prevy, this.x, this.y);
};