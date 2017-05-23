// jshint ignore: start
var lsystem;
var turtle;
var counter = 0;

function setup() {
    createCanvas(600, 600);
    var ruleset = [];
    ruleset.push(new Rule('F', "FF+[+F-F-F]-[-F+F+F]"));
    lsystem = new LSystem("F", ruleset);
    turtle = new Turtle(lsystem.sentence, height / 3, radians(25));
}

function draw() {
    background(255);
    fill(0);
    translate(width/2, height);
    rotate(-PI/2);
    turtle.render();
    noLoop();
}

function mousePressed(){
    if(counter < 5){
        push();
        lsystem.generate();
        turtle.todo = lsystem.sentence;
        turtle.changeLen(0.5);
        pop();
        redraw();
        counter++;
    }
}