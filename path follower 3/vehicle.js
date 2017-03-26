// jshint ignore: start
var Vehicle = function(position, size, maxSpeed, maxForce){
    this.position = position.copy();
    this.size = size;
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(-this.maxSpeed, this.maxSpeed);
};
Vehicle.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};
Vehicle.prototype.follow = function(path){
    function getNormalPoint(p, a, b){
        var ap = p5.Vector.sub(p, a);
        var ab = p5.Vector.sub(b, a);
        ab.normalize();
        ab.mult(ap.dot(ab));
        return p5.Vector.add(a, ab);
    };

    var predict = this.velocity.copy();
    predict.normalize();
    predict.mult(50);
    var predictPosition = p5.Vector.add(this.position, predict);
    var normal, target;
    var worldRecord = 1000000;

    for(var i = 0; i < path.points.length - 1; i++){
        var a = path.points[i];
        var b = path.points[i + 1];
        var normalPoint = getNormalPoint(predictPosition, a, b);

        if(normalPoint.x < a.x || normalPoint.x > b.x)
            normalPoint = b.copy();

        var distance = p5.Vector.dist(predictPosition, normalPoint);

        if(distance < worldRecord){
            worldRecord = distance;
            normal = normalPoint;
            var dir = p5.Vector.sub(b, a);
            dir.normalize();
            dir.mult(20);
            target = normalPoint.copy();
            target.add(dir);
        }
    }

    if(worldRecord > path.radius)
        this.seek(target);

    if (debug) {
      noFill();
      stroke(0, 100, 255, 85);
      line(this.position.x, this.position.y, predictPosition.x, predictPosition.y);
      ellipse(predictPosition.x, predictPosition.y, 4, 4);

      fill(225, 85);
      stroke(0, 100, 255, 85);
      line(predictPosition.x, predictPosition.y, normal.x, normal.y);
      ellipse(normal.x, normal.y, 4, 4);
      stroke(0, 100, 255, 85);
      if (worldRecord > path.radius) 
        fill(255, 0, 0);
      noStroke();
      ellipse(target.x, target.y, 8, 8);
    }
};
Vehicle.prototype.applyForce = function(force){
    this.acceleration.add(force);
};
Vehicle.prototype.seek = function(target){
    var desired = p5.Vector.sub(target, this.position);
    if(desired.x == 0 && desired.y == 0) return;
    desired.normalize();
    desired.mult(this.maxSpeed);
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
};
Vehicle.prototype.display = function(){
    var theta = this.velocity.heading() + PI/2;
    push();
    fill(0, 255, 0);
    noStroke();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.size * 2);
    vertex(-this.size, this.size * 2);
    vertex(this.size, this.size * 2);
    endShape(CLOSE);
    pop();
};
Vehicle.prototype.borders = function(){
    if (this.position.x < -this.size) 
        this.position.x = width + this.size;
    if (this.position.y < -this.size) 
        this.position.y = height + this.size;
    if (this.position.x > width + this.size) 
        this.position.x = -this.size;
    if (this.position.y > height + this.size) 
        this.position.y = -this.size;
};

function checkPointBetween(p, a, b){
    var dxc = p.x - a.x;
    var dyc = p.y - a.y;

    var dxl = b.x - a.x;
    var dyl = b.y - a.y;

    var cross = dxc * dyl - dyc * dxl;
    if (cross != 0)
        return false;

    if (abs(dxl) >= abs(dyl)){
        return dxl > 0 
            ? a.x <= p.x && p.x <= b.x 
            : b.x <= p.x && p.x <= a.x;
    } else {
        return dyl > 0 
            ? a.y <= p.y && p.y <= b.y 
            : b.y <= p.y && p.y <= a.y;
    }
};