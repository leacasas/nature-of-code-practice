// jshint ignore: start
var Boid = function(position, size, maxSpeed, maxForce){
    this.position = position.copy();
    this.size = size;
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
};
Boid.prototype.run = function(boids){
    this.flock(boids);
    this.update();
    this.borders();
    this.display();
};
Boid.prototype.flock = function(boids){
    var separationVector = this.separate(boids);    // Separation
    var alignVector = this.align(boids);            // Alignment
    var cohesionVector = this.cohesion(boids);      // Cohesion

    // Weight vectors
    separationVector.mult(1.5);
    alignVector.mult(1);
    cohesionVector.mult(1);
    
    // Add the force vectors to acceleration
    this.applyForce(separationVector);
    this.applyForce(alignVector);
    this.applyForce(cohesionVector);

    if(debug)
        this.displayDebugInfo(separationVector.copy(), alignVector.copy(), cohesionVector.copy());
};
Boid.prototype.separate = function(boids){
    var desiredSeparation = 25;
    var steer = createVector(0, 0, 0);
    var count = 0;
    // for every vehicle, check if it's too close
    for(var i = 0; i < boids.length; i++){
        var other = boids[i];
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
Boid.prototype.align = function(boids){
    var neighborDist = 50;
    var sum = createVector(0, 0);
    var count = 0;
    for(var i = 0; i < boids.length; i++){
        var other = boids[i];
        var distance = p5.Vector.dist(this.position, other.position);
        if((distance > 0) && (distance < neighborDist)){
            sum.add(other.velocity);
            count++;
        }
    }
    if(count > 0){
        sum.div(count);
        sum.normalize();
        sum.mult(this.maxSpeed);
        var steer = p5.Vector.sub(sum, this.velocity);
        steer.limit(this.maxForce);
        return steer;
    }else{
        return createVector(0, 0);
    }
};
Boid.prototype.cohesion = function(boids){
    var neighborDist = 50;
    var sum = createVector(0, 0);
    var count = 0;
    for(var i = 0; i < boids.length; i++){
        var other = boids[i];
        var distance = p5.Vector.dist(this.position, other.position);
        if((distance > 0) && (distance < neighborDist)){
            sum.add(other.position);
            count++;
        }
    }
    if(count > 0){
        sum.div(count);
        return this.seek(sum);
    }else{
        return createVector(0, 0);
    }
};
Boid.prototype.seek = function(target){
    var desired = p5.Vector.sub(target, this.position);
    desired.normalize();
    desired.mult(this.maxSpeed);
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce); 
    return steer;
};
Boid.prototype.applyForce = function(force){
    this.acceleration.add(force);
};
Boid.prototype.borders = function(){
    if (this.position.x < -this.size) 
        this.position.x = width + this.size;
    if (this.position.y < -this.size) 
        this.position.y = height + this.size;
    if (this.position.x > width + this.size) 
        this.position.x = -this.size;
    if (this.position.y > height + this.size) 
        this.position.y = -this.size;
};
Boid.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};
Boid.prototype.display = function(){
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
Boid.prototype.displayDebugInfo = function(sVector, aVector, cVector){
    function processVector(pos, vect){
        vect.normalize();
        vect.mult(20);
        return p5.Vector.add(pos, vect);
    }
    function drawVector(pos, color, vect){
        noFill();
        strokeWeight(1);
        stroke(color);
        line(pos.x, pos.y, vect.x, vect.y);
    }

    var sv = processVector(this.position, sVector);
    var av = processVector(this.position, aVector);
    var cv = processVector(this.position, cVector);

    drawVector(this.position, color(255, 0, 0, 95), sv);
    drawVector(this.position, color(0, 0, 255, 95), av);
    drawVector(this.position, color(255, 255, 255, 95), cv);
};