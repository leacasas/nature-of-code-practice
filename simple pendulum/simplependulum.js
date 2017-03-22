// jshint ignore: start
var pendulum;

function setup(){
    createCanvas(640, 360);
    pendulum = new Pendulum(createVector(width/2, 0), 175);
}

function draw(){
    background(200);
    pendulum.update();
    pendulum.display();
}

var Pendulum = function(origin, r){
    this.origin = origin.copy();
    this.position = createVector(0, 0);
    this.r = r;
    this.angle = PI / 3;
    this.angularVelocity = 0;
    this.angularAcceleration = 0;
    this.damping = 0.997;
};
Pendulum.prototype.update = function(){
    var gravity = 0.4;

    this.angularAcceleration = (-1 * gravity / this.r) * sin(this.angle);
    this.angularVelocity += this.angularAcceleration;
    this.angularVelocity *= this.damping;
    this.angle += this.angularVelocity;
};
Pendulum.prototype.display = function(){
    this.position.set(this.r * sin(this.angle), this.r * cos(this.angle), 0);
    this.position.add(this.origin);

    stroke(0);
    strokeWeight(2);
    line(this.origin.x, this.origin.y, this.position.x, this.position.y);
    ellipseMode(CENTER);
    fill(175);
    ellipse(this.position.x, this.position.y, 48, 48);
};