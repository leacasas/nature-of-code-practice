// jshint ignore: start
var amountOfVehicles = 100;
var vehicles = [];

function setup(){
    createCanvas(1360, 660);

    for(var i = 0; i < amountOfVehicles; i++)
        vehicles[i] = new Vehicle(random(width), random(height));
}

function draw(){
    background(255);
    var mouse = createVector(mouseX, mouseY);
    fill(200);
    stroke(0);
    strokeWeight(2);
    ellipse(mouse.x, mouse.y, 20, 20);
    for(var i = 0; i < amountOfVehicles; i++){
        vehicles[i].seek(mouse);
        vehicles[i].update();
        vehicles[i].draw();
    }
}

var Vehicle = function(x, y){
    this.position = createVector(x, y);
    this.velocity = createVector(0, 2);
    this.acceleration = createVector(0, 0);
    this.maxSpeed = 5;
    this.maxForce = 0.02;
    this.r = 6;
};
// Calculates steering force towards target.
// Steering force = desired velocity - current velocity
Vehicle.prototype.seek = function(target){ 
    var desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxSpeed);
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
};
// We could add mass. Accel = Force / Mass
Vehicle.prototype.applyForce = function(force){
    this.acceleration.add(force); 
};
Vehicle.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};
Vehicle.prototype.draw = function(){
    var theta = this.velocity.heading() + PI/2;
    fill(127);
    stroke(0);
    strokeWeight(1);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
};