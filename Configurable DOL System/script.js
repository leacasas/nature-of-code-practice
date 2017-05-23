// jshint ignore: start
var lsystem;
var turtle;
var counter = 1;

function setup() {
    createCanvas(660, 660);
    lsystem = new LSystem(config.axiom, config.productions);
    turtle = new Turtle(config.turtle);
}

function draw() {
    translate(config.turtle.startX, config.turtle.startY);
    while(counter < config.generations){
        background(0);
        push();
        lsystem.generate();
        turtle.todo = lsystem.sentence;
        turtle.changeLen(config.reduction);
        turtle.render();
        pop();
        counter++;
    }
    noLoop();
}