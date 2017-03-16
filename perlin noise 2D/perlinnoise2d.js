// jshint ignore: start

function setup() {
    createCanvas(400, 400);
    strokeWeight(1);
}

function draw() {
    var xoff = 0;
    noiseDetail(8, 0.5);
    for(var x = 0; x < width; x++) {
        xoff += 0.01;
        var yoff = 0;
        for(var y = 0; y < height; y++) {
            yoff += 0.01;
            var bright = int(noise(xoff, yoff) * 255);
            stroke(bright);
            point(x, y);
        }
    }
}