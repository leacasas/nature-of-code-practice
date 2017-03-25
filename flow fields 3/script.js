// jshint ignore: start
var amountOfVehicles = 1000;
var flowField;
var vehicles = [];
var debug = false;

function setup(){
    createCanvas(1040, 640);

    flowField = new FlowField(40);

    for(var i = 0; i < amountOfVehicles; i++)
        vehicles[i] = new Vehicle(createVector(random(width), random(height)), random(2, 5), random(0.1, 0.5));
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