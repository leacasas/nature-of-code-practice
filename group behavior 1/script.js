// jshint ignore: start
var debug = false;
var amountOfVehicles = 256;
var steerZoneSize = 40;
var path;
var vehicles = [];

function setup(){
    createCanvas(1900, 860);
    smooth();

    resetPath();
    resetVehicles();
}

function draw(){
    background(0);

    path.display();

    for(var i = 0; i < amountOfVehicles; i++){
        vehicles[i].addBehaviors(vehicles, path);
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
    path = new Path(300, random(4, 10), width/2, height/2);
}

function resetVehicles(){
    for(var i = 0; i < amountOfVehicles; i++){
        var startPos = createVector(random(width),random(height));
        vehicles[i] = new Vehicle(startPos, random(3, 5), random(1, 4), random(0.2, 0.4));
    }
}