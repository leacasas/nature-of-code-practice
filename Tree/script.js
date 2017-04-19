// jshint ignore: start
var Ɵ;   

function setup() {
    createCanvas(800, 600);
    smooth();
}

function draw() {
    background(200);

    // Let's pick an angle 0 to 90 degrees based on the mouse position
    Ɵ = map(mouseX, 0, width, 0, PI/2);
    
    // Start the tree from the bottom of the screen
    translate(width/2, height);
    stroke(0);
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
        push();                 // Save the current matrix state
        rotate(Ɵ);              // Rotate by theta
        branch(branchLength);   // Recursive call to draw two new branches
        pop();                  // Restore the previous matrix state
        
        // Repeat the same thing, only branch off to the "left" this time
        push();
        rotate(-Ɵ);
        branch(branchLength);
        pop();
  }
}