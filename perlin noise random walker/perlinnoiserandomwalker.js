// jshint ignore: start
var walkers = [];
var limit = 750;

function setup() {
    createCanvas(1360, 662);
    smooth();
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

var Walker = function() {
  this.x = int(random(width / 4, 3 * width / 4));
  this.y = int(random(height / 4, 3 * height / 4));
  this.px = 0;
  this.py = 0;
  this.tx = random(0, 10000);
  this.ty = random(0, 10000);
  this.c = 'rgb(' + int(random(0, 255)) + ', ' + int(random(0, 255)) + ', ' + int(random(0, 255)) + ')';
};

Walker.prototype.step = function() {
    this.px = this.x;
    this.py = this.y;

    this.x += map(noise(this.tx), 0, 1, -5, 5);
    this.y += map(noise(this.ty), 0, 1, -5, 5);

    this.tx += 0.01;
    this.ty += 0.01;

    this.x = constrain(this.x, 0, width - 1);
    this.y = constrain(this.y, 0, height - 1);
};
  
Walker.prototype.display = function() {
  stroke(this.c);
  strokeWeight(2);
  line(this.px, this.py, this.x, this.y);
};