// jshint ignore: start
var ca;

function setup(){
    createCanvas(800, 400);
    background(255);
    ca = new CellularAutomata();
}

function draw(){
    ca.display();
    if(ca.generation < height / ca.width)
        ca.generate();
    else{
        background(255);
        ca = new CellularAutomata();
    }

    textSize(16);
    fill(255, 0, 0);
    text("rule: " + ca.rulesetNumber, 5, 20);
}

var CellularAutomata = function(){
    this.width = 10;
    var length = width / this.width;

    this.cells = new Array(length);
    this.rulesetNumber = round(random(0, 255));
    this.ruleset = this.newRuleset();
    this.generation = 0;

    for(var i = 0; i < length; i++)
        this.cells[i] = 0;

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
        if(this.cells[i]==1) fill(0);
        else fill(255);
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