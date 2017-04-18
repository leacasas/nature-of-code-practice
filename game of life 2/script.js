// jshint ignore: start
var game;
var cellWidth = 8;

function setup() {
    createCanvas(640, 360);
    game = new GameOfLife(cellWidth);
}

function draw() {
    background(255);

    game.generate();
    game.display();
}

function mousePressed(){
    game.init();
}

// GAME OF LIFE
var GameOfLife = function(w){
    this.width = w;
    this.cols = width / w;
    this.rows = height / w;
    this.board = createArray(this.cols, this.rows);
    this.init();
};
GameOfLife.prototype.init = function(){
    for (var i = 0; i < this.cols; i++) {
        for (var j = 0; j < this.rows; j++) {
            this.board[i][j] = new Cell(i * this.width, j * this.width, this.width);
        }
    }
};
GameOfLife.prototype.generate = function(){
    for (var i = 0; i < this.cols; i++) {
        for (var j = 0; j < this.rows; j++) {
            this.board[i][j].savePrevious();
        }
    }

    // Check every spot an its neighbors
    for (var x = 0; x < this.cols; x++) {
        for (var y = 0; y < this.rows; y++) {
            // Add all states in a 3x3 grid
            var neighbors = 0;

            for(var i = -1; i <= 1; i++){
                for(var j = -1; j <= 1; j++){
                    neighbors += this.board[(x+i+this.cols)%this.cols][(y+j+this.rows)%this.rows].previous;
                }
            }

            // Substract current cell state because we added it before
            neighbors -= this.board[x][y].previous;

            // Rules of Life
            if ((this.board[x][y].state == 1) && (neighbors <  2)) 
                this.board[x][y].newState(0);                                     // Loneliness
            else if ((this.board[x][y].state == 1) && (neighbors >  3)) 
                this.board[x][y].newState(0);                                     // Overpopulation
            else if ((this.board[x][y].state == 0) && (neighbors == 3)) 
                this.board[x][y].newState(1);                                     // Reproduction
        }
    }
};
GameOfLife.prototype.display = function(){
    for (var i = 1; i < this.cols - 1; i++) {
        for (var j = 1; j < this.rows - 1; j++) {
            this.board[i][j].display();
        }
    }
};

// CELL
var Cell = function(px, py, pw){
    this.x = px;
    this.y = py;
    this.w = pw;

    this.state = round(random(0, 1));
    this.previous = this.state;
};
Cell.prototype.savePrevious = function(){
    this.previous = this.state;
};
Cell.prototype.newState = function(s){
    this.state = s;
};
Cell.prototype.display = function(){
    if (this.previous == 0 && this.state == 1) 
        fill(255);
    else if (this.state == 1) 
        fill(222, 165, 39);
    else if (this.previous == 1 && this.state == 0) 
        fill(100);
    else 
        fill(7, 8, 9); 

    stroke(222, 165, 39, 60);
    rect(this.x, this.y, this.w, this.w);
};

// Aux
function createArray(length) {
    var arr = new Array(length || 0), i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length - 1 - i] = createArray.apply(this, args);
    }

    return arr;
}