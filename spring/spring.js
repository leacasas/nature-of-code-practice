// jshint ignore: start
var bob, spring;

function setup(){
    createCanvas(640, 360);
    spring = new Spring(width / 2, 10, 100);
    bob = new Bob(width/2, 100);
}

function draw(){
    background(255);
    var gravity = createVector(0, 2);
    bob.applyForce(gravity);
    spring.connect(bob);
    spring.constrainLength(bob, 30, 200);
    bob.update();
    bob.drag(mouseX, mouseY);
    spring.displayLine(bob);
    bob.display();
    spring.display();
}

function mousePressed(){
    bob.clicked(mouseX, mouseY);
}

function mouseReleased(){
    bob.stopDragging();
}

var Spring = function(x, y, l){
    this.anchor = createVector(x, y);
    this.len = l;
    this.k = 0.2;
};
Spring.prototype.connect = function(bob){
    var force = p5.Vector.sub(bob.position, this.anchor);
    var d = force.mag();
    var stretch = d - this.len;
    force.normalize();
    force.mult(-1 * this.k * stretch);
    bob.applyForce(force);
};
Spring.prototype.constrainLength = function(bob, minlen, maxlen){
    var dir = p5.Vector.sub(bob.position, this.anchor);
    var d = dir.mag();

    if(d < minlen){
        dir.normalize();
        dir.mult(minlen);
        bob.position = p5.Vector.add(this.anchor, dir);
        bob.velocity.mult(0);
    }
    else if(d > maxlen){
        dir.normalize();
        dir.mult(maxlen);
        bob.position = p5.Vector.add(this.anchor, dir);
        bob.velocity.mult(0);
    }
};
Spring.prototype.display = function(){
    stroke(0);
    fill(175);
    strokeWeight(2);
    rectMode(CENTER);
    rect(this.anchor.x, this.anchor.y, 10, 10);
};
Spring.prototype.displayLine = function(bob){
    strokeWeight(2);
    stroke(0);
    line(bob.position.x, bob.position.y, this.anchor.x, this.anchor.y);
};

var Bob = function(x, y){
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.dragOffset = createVector(0, 0);
    this.mass = 24;
    this.damping = 0.98;
    this.dragging = false;
};
Bob.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.velocity.mult(this.damping);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};
Bob.prototype.applyForce = function(force){
    var f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
};
Bob.prototype.display = function(){
    stroke(0);
    strokeWeight(2);
    fill(175);
    if(this.dragging){
        fill(50);
    }
    ellipse(this.position.x, this.position.y, this.mass * 2, this.mass * 2);
};
Bob.prototype.clicked = function(mx, my){
    var d = dist(mx, my, this.position.x, this.position.y);
    if(d < this.mass){
        this.dragging = true;
        this.dragOffset.x = this.position.x - mx;
        this.dragOffset.y = this.position.y - my;
    }
};
Bob.prototype.drag = function(mx, my){
    if(this.dragging){
        this.position.x = mx + this.dragOffset.x;
        this.position.y = my + this.dragOffset.y;
    }
};
Bob.prototype.stopDragging = function(){
    this.dragging = false;
};