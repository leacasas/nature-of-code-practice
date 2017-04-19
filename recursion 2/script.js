// jshint ignore: start
var circleCount = 0;

function setup() {
    createCanvas(800, 600);
}

function draw() {
    background(0, 200, 200);
    drawCircles(400, 300, 512);
    stroke(0);
    fill(0);
    text("Circles: " + circleCount, 20, 20);
    noLoop();
}

function drawCircles(x, y, r){
    stroke(0, 0, 200);
    noFill();
    ellipse(x, y, r, r);
    circleCount++;

    if (r > 8) {
        var r2 = r/2;
        drawCircles(x + r2, y, r2);
        drawCircles(x - r2, y, r2);
        drawCircles(x, y + r2, r2);
        drawCircles(x, y - r2, r2);
    }
}