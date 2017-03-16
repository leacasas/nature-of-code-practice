// jshint ignore: start
var movers = [];
var fluid;
var limit = 200;
var wind;
var mu = 0.01;
var normal = 1;
var frictionMagnitude = mu * normal;

function setup() {
    createCanvas(1360, 660);
    wind = createVector(0.01, 0);
    fluid = new Fluid(0, height / 2, width, height / 2, 0.1);
    for(var i = 0; i < limit; i++) {
        movers[i] = new Mover(random(1, 4), random(65, width - 65), random(65, 130));
    }
}

function draw() {
    background(255);

    fluid.display();

    for(var i = 0; i < limit; i++) {
        if(movers[i].isInside(fluid)){
            movers[i].drag(fluid);
        }

        var friction = movers[i].velocity.copy();
        friction.normalize();
        friction.mult(-1);
        friction.mult(frictionMagnitude);

        movers[i].applyForce(friction);
        movers[i].applyForce(wind);
        movers[i].applyForce(movers[i].gravityForce);
        movers[i].update();
        movers[i].display();
        movers[i].checkEdges();
    }
}

var Mover = function(m, x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = m;
    this.size = m * 16;
    this.gravityForce = createVector(0, 0.1 * this.mass);
};
Mover.prototype.applyForce = function(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
};
Mover.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};
Mover.prototype.display = function() {
    stroke(0);
    strokeWeight(2);
    fill(0, 127);
    ellipse(this.position.x, this.position.y, this.size, this.size);
};
Mover.prototype.checkEdges = function() {
    var radius = this.size / 2;
    if(this.position.x + radius > width) {
        this.position.x = width - radius;
        this.velocity.x *= -1;
    }
    else if(this.position.x - radius < 0) {
        this.velocity.x *= -1;
        this.position.x = radius;
    }

    if(this.position.y + radius > height){
        this.velocity.y *= -1;
        this.position.y = height - radius;
    }
    else if(this.position.y - radius < 0) {
        this.velocity.y *= -1;
        this.position.y = radius;
    }
};
Mover.prototype.isInside = function(fluid){
    return this.position.x > fluid.x 
        && this.position.x < fluid.x + fluid.w 
        && this.position > fluid.y 
        && this.position.y < fluid.y + fluid.h;
};
Mover.prototype.drag = function(fluid){
    var speed = this.velocity.mag();
    var dragMagnitude = fluid.rho * speed * speed;

    var drag = this.velocity.copy();
    drag.mult(-1);
    drag.normalize();
    drag.mult(dragMagnitude);

    this.applyForce(drag);
};

var Fluid = function(x, y, w, h, rho){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.rho = rho;
};
Fluid.prototype.display = function(){
    noStroke();
    fill(175);
    rect(this.x, this.y, this.w, this.h);
};