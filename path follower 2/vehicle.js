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

    // Now we must find the normal to the path from the predicted position.
    // We look at the normal for each line segment and pick out the closest one.
    var normal, target;
    var worldRecord = 1000000; // Start with a very high record to beat it easily.

    for(var i = 0; i < path.points.length - 1; i++){
        // Look at a line segment
        var a = path.points[i];
        var b = path.points[i + 1];

        // Get the normal point to that line
        var normalPoint = getNormalPoint(predictPosition, a, b);
        // This only works because we know our path goes from left to right.
        // We could have more sophisticated test to tll if the point is in the line segment or not
        if(normalPoint.x < a.x || normalPoint.x > b.x)
            normalPoint = b.copy();
        
        // How far away are we from the path?
        var distance = p5.Vector.dist(predictPosition, normalPoint);
        // Did we beat the record and find the closest line segment?
        if(distance < worldRecord){
            worldRecord = distance;
            // If so the target we want to steer towards is the normal
            normal = normalPoint;
            // Look at the direction of the line segment so we can seek a little bit ahead of the normal
            var dir = p5.Vector.sub(b, a);
            dir.normalize();
            // This is an oversimplification
            // Should be based on distance to path & velocity
            dir.mult(10);
            target = normalPoint.copy();
            target.add(dir);
        }
    }


    if(worldRecord > path.radius)
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
      line(predictPosition.x, predictPosition.y, normal.x, normal.y);
      ellipse(normalPoint.x, normalPoint.y, 4, 4);
      stroke(0, 100, 255, 85);
      if (worldRecord > path.radius) 
        fill(255, 0, 0);
      noStroke();
      ellipse(target.x, target.y, 8, 8);
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
    if (this.position.x > path.getEnd().x + this.size) {
      this.position.x = path.getStart(0).x - this.size;
      this.position.y = path.getStart(0).y + (this.position.y - path.getEnd().y);
    } else if (this.position.x < path.getStart(0).x - this.size) {
      this.position.x = path.getEnd().x;
      this.position.y = path.getEnd().y + (this.position.y - path.getStart(0).y);
    }
};  