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

var Walker = function() {
  this.x = int(random(width / 4, 3 * width / 4));
  this.y = height/2;
  this.c = 'rgb(' + int(random(0, 255)) + ', ' + int(random(0, 255)) + ', ' + int(random(0, 255)) + ')';
};

Walker.prototype.step = function() {
    var distribution = gaussian(0, 1);
    this.x += distribution.ppf(random(1));
    this.y += distribution.ppf(random(1));
};
  
Walker.prototype.display = function() {
  stroke(this.c);
  strokeWeight(2);
  point(this.x, this.y);
};