// jshint ignore: start
var KochLine = function(a, b){
    this.start = a.copy();
    this.end = b.copy();
};

KochLine.prototype.display = function(){
    stroke(0);
    strokeWeight(2);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
};
KochLine.prototype.kochA = function(){
    return this.start.copy();
};
// Easy, just 1/3 of the way
KochLine.prototype.kochB = function(){
    var v = p5.Vector.sub(this.end, this.start);
    v.div(3);
    v.add(this.start);
    return v;
};
// Moderate, figure out where the vector is.
KochLine.prototype.kochC = function(){
    var a = this.start.copy();                  // Starting at the beginning.
    var v = p5.Vector.sub(this.end, this.start);
    v.div(3);
    a.add(v);                                   // Move to point B
    rotateVector(v, -radians(60));                    // Rotate 60 degrees
    a.add(v);                                   // Move to point C
    return a;
};
// Easy, just 2/3 of the way
KochLine.prototype.kochD = function(){
    var v = p5.Vector.sub(this.end, this.start);
    v.mult(2/3.0);
    v.add(this.start);
    return v;
};
KochLine.prototype.kochE = function(){
    return this.end.copy();
};

// Aux
function rotateVector(v, theta){
    var xTemp = v.x;

    v.x = v.x * cos(theta) - v.y * sin(theta);
    v.y = xTemp * sin(theta) + v.y * cos(theta);
}