// jshint ignore: start
var debug = true;
var amountOfVehicles = 1;
var path;
var vehicles = [];

function setup(){
    createCanvas(1360, 660);
    smooth();

    resetPath();
    resetVehicles();
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
    path = new Path(250, 6, width/2, height/2);
}

function resetVehicles(){
    for(var i = 0; i < amountOfVehicles; i++){
        var startPos = createVector(width/4, height - 100);
        vehicles[i] = new Vehicle(startPos, random(2, 5), random(2, 6), random(0.05, 0.06));
    }
}