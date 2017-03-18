// jshint ignore: start
var attractor;
var movers = [];
var G = 0.4;
var amountOfMovers = 500;

function setup(){
    createCanvas(1360, 660);
    smooth();
    attractor = new Attractor(width/2, height/2, 40);
    for(var i = 0; i < amountOfMovers; i++)
        movers[i] = new Mover(random(1, 4), random(40, width - 40), random(40, height - 40), i % 4);
}

function draw(){
    background('rgba(200, 200, 200, 0.025)');
    for(var i = 0; i < amountOfMovers; i++){
        var f = attractor.attract(movers[i]);
        movers[i].applyForce(f);
        movers[i].update();
        movers[i].display();
    }
    attractor.display();
}

var Attractor = function(x, y, m){
    this.position = createVector(x, y);
    this.mass = m;
};
Attractor.prototype.display = function(){
    noStroke();
    fill(175, 200);
    ellipse(this.position.x, this.position.y, this.mass, this.mass);
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
var Mover = function(m, x, y, quadrant){
    this.mass = m;
    this.size = m * 12;
    this.position = createVector(x, y);
    this.velocity = createVector(random(-0.5, 0.5), 0);
    this.acceleration = createVector(0, 0);
};
Mover.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};
Mover.prototype.display = function(){
    var angle = atan2(this.velocity.y, this.velocity.x);
    push();
    strokeWeight(1);
    stroke(0);
    fill(127);
    translate(this.position.x, this.position.y);
    rotate(angle);
    rect(0, 0, 15, 6);
    pop();
};
Mover.prototype.applyForce = function(force){
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
};