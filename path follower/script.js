// jshint ignore: start
var debug = true;
var path, vehicle1, vehicle2;

function setup(){
    createCanvas(1360, 660);
    smooth();

    path = new Path(20);
    vehicle1 = new Vehicle(createVector(0, height/2), 4, 2, 0.02);
    vehicle2 = new Vehicle(createVector(0, height/2), 4, 3, 0.05);
}

function draw(){
    background(255);

    path.display();

    vehicle1.follow(path);
    vehicle2.follow(path);

    vehicle1.update();
    vehicle1.display();
    vehicle2.update();
    vehicle2.display();

    vehicle1.borders(path);
    vehicle2.borders(path);
}

function keyPressed() {
  if (key == ' ') {
    debug = !debug;
  }
}