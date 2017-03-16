// jshint ignore: start

var mu = 0.01;
var normal = 1;
var frictionMagnitude = mu * normal;

var friction = velocity.copy();
friction.normalize();
friction.mult(-1);

friction.mult(frictionMagnitude);
