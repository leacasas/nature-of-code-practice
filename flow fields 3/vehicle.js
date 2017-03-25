// jshint ignore: start
var Vehicle = function(p, maxSpeed, maxForce){
    this.position = p.copy();
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
    this.r = 2 + maxSpeed * 1.5;
};
// Calculates steering force towards target.
// Steering force = desired velocity - current velocity
Vehicle.prototype.follow = function(flowField){ 
    var desired = flowField.lookup(this.position);
    desired.mult(this.maxSpeed);
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
Vehicle.prototype.borders = function(){
    if (this.position.x < -this.r) 
        this.position.x = width + this.r;
    if (this.position.y < -this.r) 
        this.position.y = height + this.r;
    if (this.position.x > width + this.r) 
        this.position.x = -this.r;
    if (this.position.y > height + this.r) 
        this.position.y = -this.r;
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