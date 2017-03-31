// jshint ignore: start
var amountOfBoids = 10;
var flock;
var debug = false;

function setup(){
    createCanvas(600, 600);
    smooth();

    flock = new Flock();
    for(var i = 0; i < amountOfBoids; i++){
        var p = createVector(random(width), random(height));
        var boid = new Boid(p, random(2, 4), random(2, 5), random(0.02, 0.06));
        flock.addBoid(boid);
    }
}

function draw(){
    background(0);

    flock.run();
}

function mousePressed(){
    var p = createVector(mouseX, mouseY);
    var boid = new Boid(p, random(2, 4), random(2, 5), random(0.02, 0.06));
    flock.addBoid(boid);
}

function keyPressed() {
    if (key == ' ')
        debug = !debug;
}