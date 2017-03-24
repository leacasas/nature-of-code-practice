// jshint ignore: start
var amountOfWanderers = 32;
var wanderers = [];
var displayWanderCircle = true;

function setup(){
    createCanvas(1360, 660);

    for(var i = 0; i < amountOfWanderers; i++)
        wanderers[i] = new Wanderer(random(width), random(height));
}

function draw(){
    background(0);
    for(var i = 0; i < amountOfWanderers; i++){
        wanderers[i].wander();
        wanderers[i].update();
        wanderers[i].borders();
        wanderers[i].display();
    }
}

function mousePressed(){
    displayWanderCircle = !displayWanderCircle;
}

var Wanderer = function(x, y){
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.maxSpeed = 2;
    this.maxForce = 0.05;
    this.r = 6;
    this.wandertheta = 0;
};
Wanderer.prototype.wander = function(){
    var wanderR = 25;   // Radius for our "wander circle"
    var wanderD = 80;   // Distance for our "wander circle"
    var change = 0.3;   // Change factor. 
    this.wandertheta += random(-change, change);

    // Now we calculate the new position to steer the "wander circle"
    var circlePosition = this.velocity.copy();  //Start with velocity
    circlePosition.normalize();                 //Normalize to get heading
    circlePosition.mult(wanderD);               //Muliply by distance
    circlePosition.add(this.position);          //Make it relative to the wanderer position

    var h = this.velocity.heading();                 //Take heading to offset wandertheta

    var circleOffset = createVector(wanderR * cos(this.wandertheta + h), wanderR * sin(this.wandertheta + h));
    var target = p5.Vector.add(circlePosition, circleOffset);
    this.seek(target);

    if(displayWanderCircle)
        this.drawWanderCircle(this.position, circlePosition, target, wanderR);
};
// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Wanderer.prototype.seek = function(target){
    // A vector pointing from the position to the target
    var desired = p5.Vector.sub(target, this.position);

    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxSpeed);
    
    // Steering = Desired minus Velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
};
// We could add mass. Accel = Force / Mass
Wanderer.prototype.applyForce = function(force){
    this.acceleration.add(force); 
};
Wanderer.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};
Wanderer.prototype.display = function(){
    var theta = this.velocity.heading() + radians(90);
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
Wanderer.prototype.borders = function(){
    if (this.position.x < -this.r) 
        this.position.x = width + this.r;
    if (this.position.y < -this.r) 
        this.position.y = height + this.r;
    if (this.position.x > width + this.r) 
        this.position.x = -this.r;
    if (this.position.y > height + this.r) 
        this.position.y = -this.r;
};
// A method just to draw the circle associated with wandering
Wanderer.prototype.drawWanderCircle = function(position, circle, target, rad) {
  stroke(0, 255, 0, 60);
  noFill();
  ellipseMode(CENTER);
  ellipse(circle.x, circle.y, rad * 2, rad * 2);
  stroke(200, 60);
  ellipse(target.x, target.y, 4, 4);
  line(position.x, position.y, circle.x, circle.y);
  stroke(200, 60);
  line(circle.x, circle.y, target.x, target.y);
}