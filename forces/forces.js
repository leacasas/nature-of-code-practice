// jshint ignore: start
var movers = [];
var limit = 20;
var wind, gravity;

function setup(){
    createCanvas(640, 480);
    for(var i = 0; i < limit; i++) {
        movers[i] = new Mover();
    }
    wind = createVector(0.25, 0);
    gravity = createVector(0, 0.5);
}

function draw(){
    background(255);
    for(var i = 0; i < limit; i++) {
        if(mouseIsPressed){
            movers[i].applyForce(wind);
        }
        movers[i].applyForce(gravity);
        movers[i].update();
        movers[i].checkEdges();
        movers[i].display();
    }
}

var Mover = function() {
    this.position = createVector(random(0, width), random(0, height));
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.topspeed = 8;
    this.mass = 10;
};

Mover.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};

Mover.prototype.display = function() {
    stroke(0);
    strokeWeight(2);
    fill(127);
    ellipse(this.position.x, this.position.y, 48, 48);
};

Mover.prototype.checkEdges = function() {
    if(this.position.x > width)
        this.position.x = 0;
    else if(this.position.x < 0)
        this.position.x = width;
    
    if(this.position.y > height)
        this.position.y = 0;
    else if(this.position.y < 0)
        this.position.y = height;
};

Mover.prototype.applyForce = function(force) {
    var f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
};