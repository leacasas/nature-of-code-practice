// jshint ignore: start
var clocation;
var cvelocity;

function setup() {
    createCanvas(640, 480);
    clocation = createVector(100, 100);
    cvelocity = createVector(2.5, 5);
}

function draw() {
    background(255);

    clocation.add(cvelocity);

    if((clocation.x > width) || (clocation.x < 0)){
        cvelocity.x *= -1;
    }

    if((clocation.y > height) || (clocation.y < 0)){
        cvelocity.y *= -1;
    }

    stroke(0);

    fill(175);
    ellipse(clocation.x, clocation.y, 16, 16);
}
