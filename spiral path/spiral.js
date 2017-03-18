var r;
var Ɵ;
var x, y, px, py;

function setup(){
    createCanvas(innerWidth, innerHeight);
    smooth();

    r = height * 0.01;
    Ɵ = 0;
    x = y = px = py = 0;
    px = r * cos(Ɵ);
}

function draw(){
    translate(width/2, height/2);

    x = r * cos(Ɵ);
    y = r * sin(Ɵ);
    
    stroke(127);
    strokeWeight(2);
    line(px, py, x, y);

    Ɵ += 0.02;
    r += 0.015;

    px = x;
    py = y;
}