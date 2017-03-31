// jshint ignore: start
var Flock = function(){
    this.boids = [];
};
Flock.prototype.run = function(){
    for(var i = 0; i < this.boids.length; i++)
        this.boids[i].run(this.boids);
};
Flock.prototype.addBoid = function(boid){
    this.boids.push(boid);
};