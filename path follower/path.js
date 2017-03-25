// jshint ignore: start
var Path = function(r, a, b){
    this.radius = r;
    this.start = createVector(0, a);
    this.end = createVector(width, b);
};
Path.prototype.display = function(){
    strokeWeight(this.radius * 2);
    stroke(225, 85);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
    strokeWeight(1);
    stroke(255);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
};