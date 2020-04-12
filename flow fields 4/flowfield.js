// jshint ignore: start
var FlowField = function(r){
    this.density = r;
    this.cols = width / this.density;
    this.rows = height / this.density;
    this.field = createArray(this.cols, this.rows);
    this.zoff = 0;

    this.init();
};
FlowField.prototype.init = function(){
    noiseSeed(int(random(10000)));
    var xoff = 0;
    for(var i = 0; i < this.cols; i++){
        var yoff = 0;
        for(var j = 0; j < this.rows; j++){
            var theta = map(noise(xoff, yoff), 0, 1, 0, TWO_PI);
            this.field[i][j] = createVector(cos(theta), sin(theta));
            yoff += 0.1;
        }
        xoff += 0.1;
    }
};
FlowField.prototype.update = function(){
    var xoff = 0;
    for (var i = 0; i < this.cols; i++) {
        var yoff = 0;
        for (var j = 0; j < this.rows; j++) {
            var theta = map(noise(xoff, yoff, this.zoff), 0, 1, 0, TWO_PI);
            this.field[i][j] = createVector(cos(theta), sin(theta));
            yoff += 0.1;
        }
        xoff += 0.1;
    }

    this.zoff += 0.01;
};
FlowField.prototype.display = function(){
    for (var i = 0; i < this.cols; i++) {
      for (var j = 0; j < this.rows; j++) {
        drawVector(this.field[i][j], i * this.density, j * this.density, this.density - 2);
      }
    }

    function drawVector(vector, x, y, scale){
        push();
        var arrowSize = 4;
        translate(x, y);
        stroke(100, 100, 200, 80);
        rotate(vector.heading());
        var len = vector.mag() * scale;
        line(0, 0, len, 0);
        line(len, 0, len - arrowSize, arrowSize / 2);
        line(len, 0, len - arrowSize, arrowSize / -2);
        pop();
    }
};
FlowField.prototype.lookup = function(position){
    var column = int(constrain(position.x / this.density, 0, this.cols - 1));
    var row = int(constrain(position.y / this.density, 0, this.rows - 1));
    return this.field[column][row].copy();
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