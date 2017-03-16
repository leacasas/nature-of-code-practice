// jshint ignore: start
var movers = [];
var attractor;
var G = 0.4;
var amountOfMovers = 50;

function setup(){
    createCanvas(1360, 660);
    smooth();
    attractor = new Attractor(mouseX, mouseY, 100);
    for(var i = 0; i < amountOfMovers; i++)
        movers[i] = new Mover(random(1, 4), random(width/2 - 40, width/2 + 40), random(height/2 - 40, height/2 + 40));
}

function draw(){
    background('rgba(200, 200, 200, 0.025)');
    for(var i = 0; i < amountOfMovers; i++){
        attractor.update();
        var f = attractor.attract(movers[i]);
        movers[i].applyForce(f);
        for(var j = 0; j < amountOfMovers; j++){
            if(i == j)continue;
            var f = movers[j].repulse(movers[i]);
            movers[i].applyForce(f);
        }
        movers[i].update();
        movers[i].display();
    }
}

var Mover = function(m, x, y){
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
    strokeWeight(3);
    stroke(0);
    noFill();
    point(this.position.x, this.position.y);
};
Mover.prototype.applyForce = function(force){
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
};
Mover.prototype.repulse = function(target){
    var force = p5.Vector.sub(this.position, target.position);
    var distance = force.mag();
    distance = constrain(distance, 5, 25);
    force.normalize();
    force.mult(-1);
    var strength = (G * this.mass * target.mass) / (distance * distance);
    force.mult(strength);
    return force;
};
var Attractor = function(x, y, m){
    this.position = createVector(x, y);
    this.mass = m;
};
Attractor.prototype.update = function(){
    this.position = createVector(mouseX, mouseY);
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