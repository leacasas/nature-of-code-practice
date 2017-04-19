// jshint ignore: start
var lines = [];

function setup() {
    createCanvas(600, 692);
    smooth();
    background(255);
    var a = createVector(0, 173);
    var b = createVector(width, 173);
    var c = createVector(width/2, 173 + width * cos(radians(30)));

    // Starting with additional lines
    lines.push(new KochLine(a, b));
    lines.push(new KochLine(b, c));
    lines.push(new KochLine(c, a));

    for(var i = 0; i < 5; i++) // 5 is the number of times we divide each line
        generate();
}

function draw() {
    background(200);
    for(var i = 0; i < lines.length; i++)
        lines[i].display();
    noLoop();
}

function generate(){
    var next = [];
    for(var i = 0; i < lines.length; i++){
        // Calculate 5 koch vectors
        var a = lines[i].kochA();
        var b = lines[i].kochB();
        var c = lines[i].kochC();
        var d = lines[i].kochD();
        var e = lines[i].kochE();
        // Make line segments between all the vectors and add them.
        next.push(new KochLine(a, b));
        next.push(new KochLine(b, c));
        next.push(new KochLine(c, d));
        next.push(new KochLine(d, e));
    }
    lines = next;
}