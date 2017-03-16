// jshint ignore: start
var movers = [];
var amountOfMovers = 100;
var liquid;

function setup(){
    createCanvas(1360, 660);
    reset();
    liquid = new Liquid(0, height/2, width, height/2, 0.1);
}

function draw(){
    background(255);

    liquid.display();

    for(var i = 0; i < amountOfMovers; i++){
        if(liquid.contains(movers[i])){
            var dragForce = liquid.drag(movers[i]);
            movers[i].applyForce(dragForce);
        }

        var gravity = createVector(0, 0.1 * movers[i].mass);
        movers[i].applyForce(gravity);
        movers[i].update();
        movers[i].display();
        movers[i].checkEdges();
    }
}

function mousePressed(){
    reset();
}

function reset(){
    for(var i = 0; i < amountOfMovers; i++){
        movers[i] = new Mover(random(0.5, 3), random(50, width - 50), random(50, height/ - 50));
    }
}

var Liquid = function(x, y, w, h, c){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
};
Liquid.prototype.contains = function(mover){
    var mp = mover.position;
    return mp.x > this.x 
        && mp.x < this.x + this.w 
        && mp.y > this.y 
        && mp.y < this.y + this.h;
};
Liquid.prototype.drag = function(mover){
    var speed = mover.velocity.mag();
    var dragMagnitude = this.c * speed * speed;

    var dragForce = mover.velocity.copy();
    dragForce.mult(-1);
    dragForce.normalize();
    dragForce.mult(dragMagnitude);

    return dragForce;
};
Liquid.prototype.display = function(){
    noStroke();
    fill(0, 170, 255);
    rect(this.x, this.y, this.w, this.h);
};

var Mover = function(m, x, y){
    this.mass = m;
    this.size = m * 16;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
};
Mover.prototype.applyForce = function(force){
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
};
Mover.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};
Mover.prototype.display = function(){
    stroke(0);
    strokeWeight(2);
    fill(127, 200);
    ellipse(this.position.x, this.position.y, this.size, this.size);
};
Mover.prototype.checkEdges = function(){
    if(this.position.y + this.size / 2 > height){
        this.velocity.y *= -0.9;
        this.position.y = height - this.size / 2;
    }
};