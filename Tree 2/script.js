// jshint ignore: start
function setup() {
    createCanvas(800, 400);
    smooth();
    newTree();
}

function draw() {
    noLoop();
}

function mousePressed(){
    push();
    newTree();
    pop();
}

function newTree(){
    background(255);
    fill(0);
    stroke(0);
    translate(width/2, height);
    branch(128);
}

function branch(branchLength) {
    // Adjusting stroke weight
    var sw = map(branchLength, 4, 128, 1, 10);
    strokeWeight(sw);
   
    // Drawing current branch upwards
    line(0, 0, 0, -branchLength);
    // Move to the end of that line
    translate(0, -branchLength);
    // Each branch will be 2/3rds the size of the previous one
    branchLength *= 0.66;
    // Exit condition : When the length of the branch is 4 pixels or less
    if (branchLength > 4) {
        var n = round(random(1, 4));        // A random number of branches
        for (var i = 0; i < n; i++) {
            push();                         // Save the current matrix state
            var Ɵ = random(-PI/2, PI/2);    // Randomizing angle
            rotate(Ɵ);                      // Rotate by theta
            branch(branchLength);           // Recursive call to draw two new branches
            pop();                          // Restore the previous matrix state
        }
  }
}