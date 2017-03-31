// jshint ignore: start
var amountOfBoids = 128;
var flock;
var debug = false;

function setup(){
    createCanvas(1360, 660);
    smooth();

    flock = new Flock();
    for(var i = 0; i < amountOfBoids; i++){
        var p = createVector(random(width), random(height));
        var boid = new Boid(p, 3.0, 3, 0.05);
        flock.addBoid(boid);
    }
}

function draw(){
    background(0);
    flock.run();

    if(debug){
        textSize(16);
        noStroke();
        fill(225, 0, 0);
        text("Separation Vector", 20, 50);
        fill(0, 0, 255);
        text("Alignment Vector", 20, 75); 
        fill(225, 255, 255);
        text("Cohesion Vector", 20, 100);
    }
}

function mousePressed(){
    var p = createVector(mouseX, mouseY);
    var boid = new Boid(p, 3.0, 3, 0.05);
    flock.addBoid(boid);
}

function keyPressed() {
    if (key == ' ')
        debug = !debug;
}