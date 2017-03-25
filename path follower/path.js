// jshint ignore: start
var Path = function(r){
    this.radius = r;
    this.start = createVector(0, height/3);
    this.end = createVector(width, 2 * height/3);
};
Path.prototype.display = function(){
    strokeWeight(this.radius * 2);
    stroke(0, 100);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
    strokeWeight(1);
    stroke(0);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
};