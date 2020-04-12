// jshint ignore: start
var t = 0;

function setup() {
    createCanvas(1900,960);
    smooth();
}

function draw() {
    background(255);
    var xoff = t;
    noFill();
    stroke(0);
    strokeWeight(2);
    beginShape();
    for(var i = 0; i < width; i++){
        var y = noise(xoff) * height;
        xoff += 0.01;
        vertex (i, y);
    }
    endShape();
    t += 0.01;
}