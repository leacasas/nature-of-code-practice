var oscillators = [];
var limit = 100;

function setup(){
    createCanvas(1360, 660);
    smooth();
    for(var i = 0; i < limit; i++)
        oscillators[i] = new Oscillator();
}

function draw(){
    background(0);
    for(var i = 0; i < limit; i++){
        oscillators[i].oscillate();
        oscillators[i].display();
    }
}

var Oscillator = function(){
    this.angle = createVector(0, 0);
    this.velocity = createVector(random(-0.05, 0.05), random(-0.05, 0.05));
    this.amplitude = createVector(random(20, width/2), random(20, height/2))
};
Oscillator.prototype.oscillate = function(){
    this.angle.add(this.velocity);
};
Oscillator.prototype.display = function(){
    var x = cos(this.angle.x) * this.amplitude.x;
    var y = sin(this.angle.y) * this.amplitude.y;

    push();
    translate(width/2, height/2);
    stroke(225);
    strokeWeight(1);
    fill(225);
    line(0, 0, x, y);
    ellipse(x, y, 12, 12);
    pop();
};