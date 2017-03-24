// jshint ignore: start
var center, stationary;

function setup(){
    createCanvas(600, 600);

    center = createVector(width/2, height/2);

    stationary = p5.Vector.sub(createVector(random(width), random(height)), center);
    stationary.normalize();
    stationary.mult(100);
}

function draw(){
    background(10);
    
    drawVector(stationary, "Stationary", 30, 90);
    
    var mousePointer = p5.Vector.sub(createVector(mouseX, mouseY), center);
    mousePointer.normalize();
    mousePointer.mult(100);

    var angle = acos(mousePointer.dot(stationary) / (mousePointer.mag() * stationary.mag()));
    textSize(32);
    fill(225);
    text("Angle between vectors: " + int(degrees(angle)) + "°", 30, 60);
    drawVector(mousePointer, "MousePointer", 30, 120);
}

function drawVector(position, label, textX, textY){
    stroke(225);
    line(center.x, center.y, center.x + position.x, center.y + position.y);
    textSize(16);
    fill(200);
    text(label + ": (" + int(position.x) + ", " + int(position.y) + ")", textX, textY);
}