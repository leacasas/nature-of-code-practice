var r; // Magnitude
var Ɵ; // Angle (in radians)

function setup(){
    createCanvas(640, 480);

    // Initialization
    r = height * 0.45;
    Ɵ = 0;
}

function draw(){
    background(220, 30);

    // Moving origin to the center of the screen
    translate(width/2, height/2);

    // Converting polar to cartesian coordinates
    var x = r * cos(Ɵ);
    var y = r * sin(Ɵ);

    console.log(int(x) + "," + int(y));
    // Drawing the circle at the cartesian coordinate
    ellipseMode(CENTER);
    fill(127);
    stroke(0);
    strokeWeight(2);
    line(0, 0, x, y);
    ellipse(x, y, 48, 48);

    // Increasing angle
    Ɵ += 0.02;
}