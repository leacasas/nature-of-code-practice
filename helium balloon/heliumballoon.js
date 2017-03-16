// jshint ignore: start
var balloons = [];
var amountOfBalloons = 20;
var t = 0;

function setup(){
    createCanvas(1360, 660);
    smooth();
    for(var i = 0; i < amountOfBalloons; i++)
        balloons[i] = new Balloon(random(60, width - 60), random(height - 100, height), random(35, 60));
}

function draw(){
    background(200);

    var windForce = createVector(noise(t) * 0.02, 0);
    console.log(windForce);
    for(var i = 0; i < amountOfBalloons; i++){
        balloons[i].update(windForce);
        balloons[i].draw();
    }

    t += 0.01
}

var Balloon = function(x, y, s){
    this.size = s;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
}
Balloon.prototype.update = function(wind) {
    if(this.checkBoundaries()){
        this.velocity.mult(0);
        this.acceleration = createVector(0, 1);
    } else {
        this.acceleration = createVector(0, -0.04);
    }
    this.acceleration.add(wind);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
};
Balloon.prototype.checkBoundaries = function() {
    return this.position.y - (this.size / 2) <= 0;
};
Balloon.prototype.draw = function() {
    noStroke();
    fill('red');
    ellipse(this.position.x, this.position.y, this.size, this.size);
};