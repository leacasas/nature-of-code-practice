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

var GameOfLife = function(w){
    this.width = w;
    this.cols = width / w;
    this.rows = height / w;
    this.board = createArray(this.cols, this.rows);
    this.init();
};
GameOfLife.prototype.init = function(){
    for (var i = 1; i < this.cols - 1; i++) {
        for (var j = 1; j < this.rows - 1; j++) {
            this.board[i][j] = round(random(0, 1));
        }
    }
};
GameOfLife.prototype.generate = function(){
    var next = createArray(this.cols, this.rows);
    // Check every spot an its neighbors
    for (var x = 1; x < this.cols - 1; x++) {
        for (var y = 1; y < this.rows - 1; y++) {
            // Add all states in a 3x3 grid
            var neighbors = 0;

            for(var i = -1; i <= 1; i++){
                for(var j = -1; j <= 1; j++){
                    neighbors += this.board[x + i][y + j];
                }
            }

            // Substract current cell state because we added it before
            neighbors -= this.board[x][y];

            // Rules of Life
            if ((this.board[x][y] == 1) && (neighbors <  2)) 
                next[x][y] = 0;                                     // Loneliness
            else if ((this.board[x][y] == 1) && (neighbors >  3)) 
                next[x][y] = 0;                                     // Overpopulation
            else if ((this.board[x][y] == 0) && (neighbors == 3)) 
                next[x][y] = 1;                                     // Reproduction
            else
                next[x][y] = this.board[x][y];                      // Stasis
        }
    }

    // Update board
    this.board = next;
};
GameOfLife.prototype.display = function(){
    for (var i = 1; i < this.cols - 1; i++) {
        for (var j = 1; j < this.rows - 1; j++) {
            if ((this.board[i][j] == 1)) fill(222, 165, 39);
            else fill(7, 8, 9); 
            stroke(222, 165, 39, 60);
            rect(i * this.width, j * this.width, this.width, this.width);
        }
    }
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