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
    
    stroke(0);
    strokeWeight(1);
    line(px, py, x, y);

    Ɵ += 0.25;
    r += 0.075;

    px = x;
    py = y;
}