// jshint ignore: start
var Path = function(r, a, b){
    this.radius = r;
    this.start = createVector(0, a);
    this.end = createVector(width, b);
    this.points = [];
};
Path.prototype.addPoint = function(x, y){
    this.points.push(createVector(x, y));
};
Path.prototype.getStart = function(i){
    return this.points[i];
};
Path.prototype.getEnd = function(){
    return this.points[this.points.length - 1];
};
Path.prototype.display = function(){
    stroke(225, 85);
    strokeWeight(this.radius * 2);
    noFill();
    beginShape();
    for (var i = 0; i < this.points.length; i++)
      vertex(this.points[i].x, this.points[i].y);
    endShape();
    stroke(255);
    strokeWeight(1);
    noFill();
    beginShape();
    for (var i = 0; i < this.points.length; i++)
      vertex(this.points[i].x, this.points[i].y);
    endShape();
};