// jshint ignore: start
var cannon;
var initialHeight;
var mu = 0.01;

function setup(){
    createCanvas(1360, 660);
    smooth();

    initialHeight = height * 0.75;
    cannon = new Cannon(width / 2, initialHeight);
}

function draw(){
    background(16);

    cannon.update(mouseX, mouseY, mouseIsPressed);
    cannon.display();

    push();
    stroke(127);
    strokeWeight(3);
    noFill();
    line(0, initialHeight, width, initialHeight);
    pop();
}

var Cannon = function(x, y){
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.topSpeed = 10;
    this.w = 60;
    this.h = 20;
    this.cannonball = new CannonBall(this.position.x, this.position.y, 1);
};
Cannon.prototype.update = function(mx, my, isPressed){
    //cannonball
    if(!this.cannonball.isTraveling){
        var angle = p5.Vector.sub(this.position, createVector(mouseX, min(mouseY, initialHeight))).heading();
        var aim = p5.Vector.fromAngle(angle).mult(-this.w);
        this.cannonball.position = createVector(aim.x + this.position.x, aim.y + this.position.y);
    }
        
    if(isPressed && this.cannonball.fireable)
        this.fire();

    this.cannonball.update();

    //friction
    var friction = this.velocity.copy();
    friction.normalize();
    friction.mult(-1);
    friction.mult(mu);
    this.acceleration.add(friction);

    //mouse accel
    var distance = mx - this.position.x;
    var xdir = distance < 0 ? sqrt(distance * -1) * -1 : sqrt(distance);
    var direction = createVector(xdir, 0).div(678);
    this.acceleration.add(direction);

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);

    //bounds
    this.position.x = constrain(this.position.x, this.w/2, width - this.w/2);
    if(this.position.x <= this.w/2){
        this.velocity.x *= -0.1;
        this.position.x = this.w/2;
    }
    else if(this.position.x >= width - this.w/2){
        this.velocity.x *= -0.1;
        this.position.x =  width - this.w/2;
    }

    this.acceleration.mult(0);
};
Cannon.prototype.display = function(){
    this.cannonball.display();

    push();
    translate(this.position.x, this.position.y);
    var angle = p5.Vector.sub(this.position, createVector(mouseX, min(mouseY, initialHeight)));
    rotate(angle.heading());
    noStroke();
    fill(127);
    rect(0 - this.w, 0 - this.h/2, this.w, this.h);
    pop();

    noStroke();
    fill(127);
    rect(this.position.x - this.w /2, this.position.y - this.h/2, this.w, this.h);
};
Cannon.prototype.fire = function(){
    var angle = p5.Vector.sub(this.position, createVector(mouseX, min(mouseY, initialHeight))).heading();
    var aim = p5.Vector.fromAngle(angle).mult(-1);
    var shotForce = createVector(aim.x, aim.y).mult(10);

    this.cannonball.acceleration.add(shotForce);
    this.cannonball.drawable = true;
    this.cannonball.fireable = false;
    this.cannonball.isTraveling = true;
};

var CannonBall = function(x, y, m){
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.angle = 0;
    this.angularVelocity = 0;
    this.angularAcceleration = 0;
    this.mass = m;
    this.drawable = false;
    this.isTraveling = false;
    this.fireable = true;
};
CannonBall.prototype.update = function(){
    if(this.position.y > height)
        this.reset();

    if(this.isTraveling){
        var gravity = createVector(0, 0.1 * this.mass);
        var g = p5.Vector.div(gravity, this.mass);

        this.acceleration.add(g);
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.angularAcceleration = this.acceleration.x / 10;
        this.angularVelocity += this.angularAcceleration;
        this.angularVelocity = constrain(this.angularVelocity, -0.1, 0.1);
        this.angle += this.angularVelocity;
        this.acceleration.mult(0);
    }
};
CannonBall.prototype.display = function(){
    if(this.drawable){
        push();
        noStroke();
        fill(200, 5, 5);
        push();
        translate(this.position.x, this.position.y);
        rotate(this.angle);
        ellipse(0, 0, 20, 20);
        fill(255);
        ellipse(0, -7, 5, 5);
        pop();
    }
};
CannonBall.prototype.reset = function(){
    this.drawable = false;
    this.fireable = true;
    this.isTraveling = false;
    this.acceleration.mult(0);
    this.velocity.mult(0);
    this.angle = 0;
    this.angularVelocity = 0;
    this.angularAcceleration = 0;
};