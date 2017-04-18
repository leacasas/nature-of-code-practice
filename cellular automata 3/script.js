// jshint ignore: start
var ca;
var cellWidth = 1;

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(35, 66, 45);
    ca = new CellularAutomata(cellWidth);
}

function draw(){
    ca.display();
    if(ca.generation < height / ca.width)
        ca.generate();
}

function mousePressed(){
    if (mouseButton == LEFT){
        background(35, 66, 45);
        ca = new CellularAutomata(cellWidth);
    }
}

function keyPressed() {
    if (key == ' '){
        console.log("rule: ");
        console.log(ca.rulesetNumber);
        console.log("seed: ");
        console.log(ca.gen0);
        fill(255);
        textSize(12);
        text("rule: " + ca.rulesetNumber, 20, height - 80);
        text("seed: ", 20, height - 60);
        text(ca.gen0, 10, height - 40);
    }
}

var CellularAutomata = function(w){
    this.width = w;
    var length = width / this.width;

    this.cells = new Array(length);
    this.rulesetNumber = round(random(0, 255));
    this.ruleset = this.newRuleset();
    this.generation = 0;

    for(var i = 0; i < length; i++)
        this.cells[i] = round(random(1));
    this.gen0 = this.cells.join('');
    this.cells[length / 2] = 1;
};
CellularAutomata.prototype.generate = function(){
    var length = this.cells.length;
    // Create a new array to hold new values.
    var nextgen = new Array(length);
    // Determine state for every spot by examining current state of cell and neighbors. Ignore edges.
    for(var i = 1; i < length - 1; i++){
        var left = this.cells[i - 1];   // Left neighbor
        var me = this.cells[i];         // Current cell
        var right = this.cells[i + 1];  // Right neighbor
        nextgen[i] = this.rules(left, me, right);// Compute next generation state based on ruleset
    }
    // Promote current gen
    this.cells = nextgen;
    this.generation++;
};
CellularAutomata.prototype.display = function(){
    for(var i = 0; i < this.cells.length; i++){
        if(this.cells[i]==1) fill(40, 178, 75);
        else fill(35, 66, 45);
        noStroke();
        rect(i * this.width, this.generation * this.width, this.width, this.width);
    }
};
CellularAutomata.prototype.rules = function(a, b, c){
    if (a == 1 && b == 1 && c == 1) return this.ruleset[0];
    if (a == 1 && b == 1 && c == 0) return this.ruleset[1];
    if (a == 1 && b == 0 && c == 1) return this.ruleset[2];
    if (a == 1 && b == 0 && c == 0) return this.ruleset[3];
    if (a == 0 && b == 1 && c == 1) return this.ruleset[4];
    if (a == 0 && b == 1 && c == 0) return this.ruleset[5];
    if (a == 0 && b == 0 && c == 1) return this.ruleset[6];
    if (a == 0 && b == 0 && c == 0) return this.ruleset[7];
    return 0;
};
CellularAutomata.prototype.newRuleset = function(){
    return (this.rulesetNumber >>> 0).toString(2).padStart(8, "0").split('');
};