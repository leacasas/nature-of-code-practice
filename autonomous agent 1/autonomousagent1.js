// jshint ignore: start
var amountOfVehicles = 1024;
var vehicles = [];
var mouse;

function setup(){
    createCanvas(1360, 660);
    mouse = createVector(0, 0);
    for(var i = 0; i < amountOfVehicles; i++)
        vehicles[i] = new Vehicle(random(width), random(height));
}

function draw(){
    background(0);
    mouse.x = mouseX;
    mouse.y = mouseY;
    fill(200);
    noStroke();
    ellipse(mouse.x, mouse.y, 10, 10);
    for(var i = 0; i < amountOfVehicles; i++){
        vehicles[i].seek(mouse);
        vehicles[i].update();
        vehicles[i].draw();
    }
}

var Vehicle = function(x, y){
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, 0);
    this.maxSpeed = 7;
    this.maxForce = 0.02;
    this.r = 4;
};
// Calculates steering force towards target.
// Steering force = desired velocity - current velocity
Vehicle.prototype.seek = function(target){ 
    var steer = p5.Vector.sub(target, this.position);
    steer.setMag(this.maxSpeed);
    steer.sub(this.velocity);
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
    fill(0, 255, 0);
    noStroke()
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 1.5);
    vertex(-this.r, this.r);
    vertex(this.r, this.r);
    endShape(CLOSE);
    pop();
};