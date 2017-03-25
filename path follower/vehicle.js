// jshint ignore: start
var Vehicle = function(position, size, maxSpeed, maxForce){
    this.position = position.copy();
    this.size = size;
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(this.maxSpeed, 0);
};

Vehicle.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};
// Ths function implements Craig Reynolds' path following algorithm
Vehicle.prototype.follow = function(path){
    // Private function. Utility.
    // Gets the normal point from p to a line segment (a to b).
    function getNormalPoint(p, a, b){
        // Vector from a to p
        var ap = p5.Vector.sub(p, a);
        // Vector from a to b
        var ab = p5.Vector.sub(b, a);
        ab.normalize();
        // Project vector "diff" onto line by using dot product
        ab.mult(ap.dot(ab));
        return p5.Vector.add(a, ab);
    };

    // Predict position.
    // Use the velocity vector pointing to a given distance from the position.
    var predict = this.velocity.copy();
    predict.normalize();
    predict.mult(50);
    var predictPosition = p5.Vector.add(this.position, predict);

    // Look at the line segment
    var pathStart = path.start;
    var pathEnd = path.end;

    // Get the normal point to that line
    var normalPoint = getNormalPoint(predictPosition, pathStart, pathEnd);

    // Find target point a little further ahead of normal point.
    var dir = p5.Vector.sub(pathStart, pathEnd);
    dir.normalize();
    dir.mult(10);
    var target = p5.Vector.add(normalPoint, dir);

    // How far away are we from the path?
    var distance = p5.Vector.dist(predictPosition, normalPoint);
    // Only if the distance is greater than the path's radius do we bother to steer
    if(distance > path.radius)
        this.seek(target);
    
    // Draw the debugging stuff
    if (debug) {
      noFill();
      stroke(0, 100, 255, 85);
      line(this.position.x, this.position.y, predictPosition.x, predictPosition.y);
      ellipse(predictPosition.x, predictPosition.y, 4, 4);

      // Draw normal position
      fill(225, 85);
      stroke(0, 100, 255, 85);
      line(predictPosition.x, predictPosition.y, normalPoint.x, normalPoint.y);
      ellipse(normalPoint.x, normalPoint.y, 4, 4);
      stroke(0, 100, 255, 85);
      if (distance > path.radius) 
        fill(255, 0, 0);
      noStroke();
      ellipse(target.x + dir.x, target.y + dir.y, 8, 8);
    }
};
Vehicle.prototype.applyForce = function(force){
    this.acceleration.add(force);
};
Vehicle.prototype.seek = function(target){
    var desired = p5.Vector.sub(target, this.position);

    if(desired.x == 0 && desired.y == 0) return;

    desired.normalize();
    desired.mult(this.maxSpeed);

    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
};
Vehicle.prototype.display = function(){
    var theta = this.velocity.heading() + PI/2;
    
    push();
    fill(0, 255, 0);
    noStroke();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.size * 2);
    vertex(-this.size, this.size * 2);
    vertex(this.size, this.size * 2);
    endShape(CLOSE);
    pop();
};
// Wraparound
Vehicle.prototype.borders = function(path){
    if (this.position.x > path.end.x + this.size) {
      this.position.x = path.start.x - this.size;
      this.position.y = path.start.y + (this.position.y - path.end.y);
    } else if (this.position.x < path.start.x - this.size) {
      this.position.x = path.end.x;
      this.position.y = path.end.y + (this.position.y - path.start.y);
    }
};  