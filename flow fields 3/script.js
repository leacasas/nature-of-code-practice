// jshint ignore: start
var amountOfVehicles = 768;
var flowField;
var vehicles = [];
var debug = false;

function setup(){
    createCanvas(1850, 850);

    flowField = new FlowField(50);

    for(var i = 0; i < amountOfVehicles; i++)
        vehicles[i] = new Vehicle(createVector(random(width), random(height)), random(1, 3), random(0.075, 0.75));
}

function draw(){
    background(0);
    
    flowField.update();
    if(debug)flowField.display();
    
    for(var i = 0; i < amountOfVehicles; i++){
        vehicles[i].follow(flowField);
        vehicles[i].update();
        vehicles[i].borders();
        vehicles[i].draw();
    }
}

function mousePressed(){
    debug = !debug;
}