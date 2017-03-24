// jshint ignore: start
var amountOfVehicles = 32;
var vehicles = [];

function setup(){
    createCanvas(1360, 660);

    for(var i = 0; i < amountOfVehicles; i++)
        vehicles[i] = new Vehicle(random(width), random(height));
}

function draw(){
    background(0);
    var mouse = createVector(mouseX, mouseY);
    fill(200);
    noStroke();
    ellipse(mouse.x, mouse.y, 24, 24);
    for(var i = 0; i < amountOfVehicles; i++){
        vehicles[i].arrive(mouse);
        vehicles[i].update();
        vehicles[i].draw();
    }
}

var Vehicle = function(x, y){
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, 0);
    this.maxSpeed = 4;
    this.maxForce = 0.1;
    this.r = 6;
};
// A method that calculates a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Vehicle.prototype.arrive = function(target){
    var damping = 200; // Radius around target where the vehicle starts to slow down
    var desired = p5.Vector.sub(target, this.position);
    var d = desired.mag();

    if(d < 100){
        var m = map(d, 0, damping, 0, this.maxSpeed);
        desired.setMag(m);
    } else {
        desired.mult(this.maxSpeed);
    }

    // Steering = desired - velocity
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