// jshint ignore: start
var lineCount = 0;

function setup() {
    createCanvas(800, 600);
}

function draw() {
    background(0, 200, 0);
    drawLines(200, 300, 600, 300);
    text("Lines: " + lineCount, 20, 20);
    noLoop();
}

function drawLines(x1, y1, x2, y2){
    var diff = 2;

    line(x1, y1, x2, y2);
    lineCount++;

    var dx = x2 - x1;
    var dy = y2 - y1;

    if (dx == 0 && dy > diff) {
        drawLines(x1 - dy/3, y1, x1 + dy/3, y1);
        drawLines(x1 - dy/3, y2, x1 + dy/3, y2);
    } else if (dy == 0 && dx > diff) {
        drawLines(x1, y1 - dx/3, x1, y1 + dx/3)
        drawLines(x2, y1 - dx/3, x2, y1 + dx/3)
    }
}