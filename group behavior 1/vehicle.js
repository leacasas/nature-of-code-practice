// jshint ignore: start
var Vehicle = function(position, size, maxSpeed, maxForce){
    this.position = position.copy();
    this.size = size;
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-this.maxSpeed, this.maxSpeed), random(-this.maxSpeed, this.maxSpeed));
};
Vehicle.prototype.addBehaviors = function(vehicles, path){
    var followVector = this.follow(path);
    var separateVector = this.separate(vehicles);
    // Arbitrary weighting of vectors
    followVector.mult(3);
    separateVector.mult(1);
    // Accumulate in acceleration force
    this.applyForce(followVector);
    this.applyForce(separateVector);
};
Vehicle.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};
Vehicle.prototype.follow = function(path){
    function getNormalPoint(p, a, b){
        var ap = p5.Vector.sub(p, a);
        var ab = p5.Vector.sub(b, a);
        ab.normalize();
        ab.mult(ap.dot(ab));
        return p5.Vector.add(a, ab);
    };

    var predict = this.velocity.copy();
    predict.normalize();
    predict.mult(50);
    var predictPosition = p5.Vector.add(this.position, predict);
    var normal, target;
    var worldRecord = 1000000;

    for(var i = 0; i < path.points.length; i++){
        var a = path.points[i];
        var b = path.points[(i + 1) % path.points.length]; // Wraparound
        var normalPoint = getNormalPoint(predictPosition, a, b);

        // Check if normal is on line segment.
        // If it's not within the line segment, consider the normal to just be the end of the line segment (point b)
        var dir = p5.Vector.sub(b, a);
        if(normalPoint.x < min(a.x, b.x) || normalPoint.x > max(a.x, b.x) 
        || normalPoint.y < min(a.y, b.y) || normalPoint.y > max(a.y, b.y)){
            normalPoint = b.copy();
            a = path.points[(i + 1) % path.points.length];
            b = path.points[(i + 2) % path.points.length];
            dir = p5.Vector.sub(b, a);
        }
        
        var distance = p5.Vector.dist(predictPosition, normalPoint);

        if(distance < worldRecord){
            worldRecord = distance;
            normal = normalPoint;
            dir.normalize();
            dir.mult(20);
            target = normal.copy();
            target.add(dir);
        }
    }

    if (debug) {
      noFill();
      stroke(0, 100, 255, 85);
      line(this.position.x, this.position.y, predictPosition.x, predictPosition.y);
      ellipse(predictPosition.x, predictPosition.y, 4, 4);

      fill(225, 85);
      stroke(0, 100, 255, 85);
      ellipse(normal.x, normal.y, 4, 4);
      line(predictPosition.x, predictPosition.y, normal.x, normal.y);
      stroke(0, 100, 255, 85);
      if (worldRecord > steerZoneSize) 
        fill(255, 0, 0);
      noStroke();
      ellipse(target.x, target.y, 8, 8);
    }

    if(worldRecord > steerZoneSize)
        return this.seek(target);
    else
        return createVector(0, 0);
};
Vehicle.prototype.separate = function(vehicles){
    var desiredSeparation = this.size * 10;
    var steer = createVector(0, 0);
    var count = 0;
    // for every vehicle, check if it's too close
    for(var i = 0; i < vehicles.length; i++){
        var other = vehicles[i];
        var distance = p5.Vector.dist(this.position, other.position);
        // If the distance is greater than 0 and less than an arbitray amount
        if((distance > 0) && (distance < desiredSeparation)){
            // Vector pointing away
            var diff = p5.Vector.sub(this.position, other.position);
            diff.normalize();
            diff.div(distance); // Weight by distance
            steer.add(diff);
            count++;            // Used to calculate average
        }
    }
    // Average.
    if(count > 0)
        steer.div(count);
    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxSpeed);
      steer.sub(this.velocity);
      steer.limit(this.maxForce);
    }
    return steer;
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
    return (steer);
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
Vehicle.prototype.borders = function(){
    if (this.position.x < -this.size) 
        this.position.x = width + this.size;
    if (this.position.y < -this.size) 
        this.position.y = height + this.size;
    if (this.position.x > width + this.size) 
        this.position.x = -this.size;
    if (this.position.y > height + this.size) 
        this.position.y = -this.size;
};