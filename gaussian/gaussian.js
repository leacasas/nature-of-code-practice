// jshint ignore: start

function setup() {
    createCanvas(1360, 662);
}

function draw() {
    var deviation = 60;
    var mean = 320;
    
    var distribution = gaussian(mean, deviation * deviation);
    var x = distribution.ppf(random(1));

    noStroke();
    fill(0, 10);

    ellipse(x, 180, 16, 16);
}