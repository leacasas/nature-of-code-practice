function setup(){
    createCanvas(640, 360);
}

function draw(){
    background(255);

    var period = 1200;
    var amplitude = 250;

    //calculating horizontal position according to formula for simple harmonic motion
    var x = amplitude * sin(TWO_PI * frameCount / period);

    stroke(0);
    strokeWeight(2);
    fill(127);
    translate(width/2, height/2);
    line(0, 0, x, 0);
    ellipse(x, 0, 48, 48);
}