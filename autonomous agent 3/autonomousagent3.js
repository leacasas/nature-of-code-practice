// jshint ignore: start
var amountOfVehicles = 768;
var vehicles = [];
var target;

function setup(){
    createCanvas(1600, 900);

    for(var i = 0; i < amountOfVehicles; i++)
        vehicles[i] = new Vehicle(random(width), random(height));
    
    target = new Target(width/2, height/2);
}

function draw(){
    background(0);
    
    target.update();

    for(var i = 0; i < amountOfVehicles; i++){
        var t = p5.Vector.add(target.position, target.velocity);
        vehicles[i].seek(t);
        vehicles[i].update();
        vehicles[i].draw();
    }

    target.draw();
}

class Vehicle {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = createVector(random(-1, 1), random(-1, 1));
        this.acceleration = createVector(0, 0);
        this.maxSpeed = 7;
        this.maxForce = 0.03;
        this.r = 4;
    }

    // Calculates steering force towards target.
    // Steering force = desired velocity - current velocity
    seek(target) {
        var desired = p5.Vector.sub(target, this.position);
        desired.setMag(this.maxSpeed);
        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxForce);
        this.applyForce(steer);
    }

    // We could add mass. Accel = Force / Mass
    applyForce(force) {
        this.acceleration.add(force);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        if (this.position.x > width)
            this.position.x = 0;
        else if (this.position.x < 0)
            this.position.x = width;
        if (this.position.y > height)
            this.position.y = 0;
        else if (this.position.y < 0)
            this.position.y = height;
    }

    draw() {
        var theta = this.velocity.heading() + PI / 2;
        fill(0, 225, 100, 100);
        stroke(0, 255, 0);
        push();
        translate(this.position.x, this.position.y);
        rotate(theta);
        beginShape();
        vertex(0, -this.r * 1.5);
        vertex(-this.r, this.r);
        vertex(this.r, this.r);
        endShape(CLOSE);
        pop();
    }
}

class Target {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = createVector(random(-1, 1), random(-1, 1));
        this.acceleration = createVector(0, 0);
        this.maxSpeed = 7;
        this.tx = random(0, 10000);
        this.ty = random(0, 10000);
    }
    update() {
        this.tx += 0.01;
        this.ty += 0.01;
        var ax = (noise(this.tx) - 0.5) / 20;
        var ay = (noise(this.ty) - 0.5) / 20;
        this.acceleration = createVector(ax, ay);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        if (this.position.x > width)
            this.position.x = 0;
        else if (this.position.x < 0)
            this.position.x = width;
        if (this.position.y > height)
            this.position.y = 0;
        else if (this.position.y < 0)
            this.position.y = height;
    }
    draw() {
        fill(255, 0, 0);
        noStroke();
        ellipse(this.position.x, this.position.y, 15, 15);
    }
}
