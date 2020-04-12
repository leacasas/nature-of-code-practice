class Path {
  constructor(r, n, x, y) {
    this.radius = r;
    this.origin = createVector(x, y);
    this.points = [];
    this.build(n);
  }

  build(n) {
    var angleIncrement = (TWO_PI) / n + random(-0.15, 0.15);
    var randomDir = createVector(random(-this.radius, this.radius), random(-this.radius, this.radius));
    randomDir.normalize();
    randomDir.mult(this.radius);
    for (var i = 0; i < n; i++) {
      var x = this.origin.x + randomDir.x;
      var y = this.origin.y + randomDir.y;
      this.points.push(createVector(x, y));
      randomDir.rotate(angleIncrement);
    }
  }

  display() {
    stroke(225, 85);
    strokeWeight(steerZoneSize * 2.1);
    noFill();

    beginShape();
    for (var i = 0; i < this.points.length; i++)
      vertex(this.points[i].x, this.points[i].y);
    endShape(CLOSE);
    stroke(255);
    strokeWeight(1);
    noFill();

    beginShape();
    for (var i = 0; i < this.points.length; i++)
      vertex(this.points[i].x, this.points[i].y);
    endShape(CLOSE);
  }
}