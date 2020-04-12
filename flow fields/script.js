
var amountOfVehicles = 64;
var flowField;
var vehicles = [];
var debug = true;

function setup(){
    createCanvas(1536, 960);

    flowField = new FlowField(64);

    for(var i = 0; i < amountOfVehicles; i++)
        vehicles[i] = new Vehicle(createVector(random(width), random(height)), random(2, 5), random(0.1, 0.5));
}

function draw(){
    background(0);

    if(debug)flowField.display();
    
    for(var i = 0; i < amountOfVehicles; i++){
        vehicles[i].follow(flowField);
        vehicles[i].update();
        vehicles[i].borders();
        vehicles[i].draw();
    }
}