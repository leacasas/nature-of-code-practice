// jshint ignore: start
var movers = [];
var limit = 20;

function setup(){
    createCanvas(640, 480);
    for(var i = 0; i < limit; i++) {
        movers[i] = new Mover();
    }
}

function draw(){
    background(255);
    for(var i = 0; i < limit; i++) {
        movers[i].update();
        movers[i].checkEdges();
        movers[i].display();
    }
}

var Mover = function(){
    this.position = createVector(random(0, width), random(0, height));
    this.velocity = createVector(0, 0);
    this.topspeed = 8;
};

Mover.prototype.update = function(){
    var direction = p5.Vector.sub(createVector(mouseX, mouseY), this.position).normalize().mult(0.5);
    this.acceleration = direction;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
};

Mover.prototype.display = function(){
    stroke(0);
    strokeWeight(2);
    fill(127);
    ellipse(this.position.x, this.position.y, 48, 48);
};

Mover.prototype.checkEdges = function(){
    if(this.position.x > width)
        this.position.x = 0;
    else if(this.position.x < 0)
        this.position.x = width;
    
    if(this.position.y > height)
        this.position.y = 0;
    else if(this.position.y < 0)
        this.position.y = height;
};