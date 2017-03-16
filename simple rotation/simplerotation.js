// jshint ignore: start
var angle = 0.01;

function setup(){
    createCanvas(640, 480);
    smooth();
}

function draw(){
    background(255);
    
    translate(width/2, height/2);
    rotate(angle);
    stroke(0);
    strokeWeight(2);
    line(-50, 0, 50, 0);
    fill(127);
    ellipse(-50, 0, 20, 20);
    ellipse(50, 0, 20, 20);
    angle += 0.01;
}