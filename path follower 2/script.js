// jshint ignore: start
var debug = false;
var amountOfVehicles = 100;
var path;
var vehicles = [];

function setup(){
    createCanvas(1360, 660);
    smooth();

    path = new Path(20, 20, height - 20);
    path.addPoint(-20, height/2);
    path.addPoint(random(0, width/2), random(0, height));
    path.addPoint(random(width/2, width), random(0, height));
    path.addPoint(width + 20, height/2);

    for(var i = 0; i < amountOfVehicles; i++){
        var startPos = createVector(width/4, 2 * height/3);
        vehicles[i] = new Vehicle(startPos, random(3, 6), random(1, 4), random(0.01, 0.06));
    }
}

function draw(){
    background(0);

    path.display();

    for(var i = 0; i < amountOfVehicles; i++){
        vehicles[i].follow(path);
        vehicles[i].update();
        vehicles[i].display();
        vehicles[i].borders(path);
    }
}

function keyPressed() {
  if (key == ' ') {
    debug = !debug;
  }
}

function mousePressed(){
    resetPath();
    resetVehicles();
}

function resetPath(){
    path = new Path(20, 20, height - 20);
    path.addPoint(-20, height/2);
    path.addPoint(random(0, width/2), random(0, height));
    path.addPoint(random(width/2, width), random(0, height));
    path.addPoint(width + 20, height/2);
}

function resetVehicles(){
    for(var i = 0; i < amountOfVehicles; i++){
        var startPos = createVector(width/4, 2 * height/3);
        vehicles[i] = new Vehicle(startPos, random(3, 6), random(1, 4), random(0.01, 0.06));
    }
}