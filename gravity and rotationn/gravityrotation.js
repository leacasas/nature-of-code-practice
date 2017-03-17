// jshint ignore: start
var attractor;
var movers = [];
var G = 0.25;
var amountOfMovers = 100;

function setup(){
    createCanvas(windowWidth, windowHeight);
    smooth();
    noCursor();
    attractor = new Attractor(width/2, height/2, 40);
    for(var i = 0; i < amountOfMovers; i++)
        movers[i] = new Mover(random(1, 5), random(40, width - 40), random(40, height - 40));
}

function draw(){
    background('rgba(200, 200, 200, 0.01)');
    for(var i = 0; i < amountOfMovers; i++){
        var f = attractor.attract(movers[i]);
        movers[i].applyForce(f);
        movers[i].update();
        movers[i].display();
    }
}

// Attractor
var Attractor = function(x, y, m){
    this.position = createVector(x, y);
    this.mass = m;
};
Attractor.prototype.attract = function(target){
    var force = p5.Vector.sub(this.position, target.position);
    var distance = force.mag();
    distance = constrain(distance, 5, 25);
    force.normalize();
    var strength = (G * this.mass * target.mass) / (distance * distance);
    force.mult(strength);
    return force;
};

// Mover
var Mover = function(m, x, y){
    this.mass = m;
    this.size = m * 4;
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, 0);
    this.angle = 0;
    this.angularVelocity = 0;
    this.angularAcceleration = 0;
};
Mover.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.angularAcceleration = this.acceleration.x / 10;
    this.angularVelocity += this.angularAcceleration;
    this.angularVelocity = constrain(this.angularVelocity, -0.1, 0.1);
    this.angle += this.angularVelocity;
    this.acceleration.mult(0);
};
Mover.prototype.display = function(){
    strokeWeight(2);
    stroke(0, 60);
    fill(127, 60);
    rectMode(CENTER);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    rect(0, 0, this.size, this.size);
    pop();
};
Mover.prototype.applyForce = function(force){
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
};