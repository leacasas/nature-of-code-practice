// jshint ignore: start
var randomCounts = [];

function setup() {
    createCanvas(640, 240);
    for(var i = 0; i < 20; i++)
        randomCounts.push(0);
}

function draw() {
    background(255);

    var index = int(random(randomCounts.length));

    randomCounts[index]++;

    stroke(0);
    fill(175);

    var w = width / randomCounts.length;

    for(var i = 0; i < randomCounts.length; i++)
        rect(i * w, height - randomCounts[i], w - 1, randomCounts[i]);
}