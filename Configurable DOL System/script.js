// jshint ignore: start
var lsystem;
var turtle;
var counter = 0;

function setup() {
    createCanvas(600, 600);
    lsystem = new LSystem(config.axiom, config.productions);
    turtle = new Turtle(config.turtle);
}

function draw() {
    background(0);
    translate(config.turtle.startX, config.turtle.startY);
    turtle.render();
    noLoop();
}

function mousePressed(){
    if(mouseButton == LEFT && counter < config.generations){
        push();
        lsystem.generate();
        turtle.todo = lsystem.sentence;
        turtle.changeLen(config.reduction);
        pop();
        redraw();
        counter++;
    }
}