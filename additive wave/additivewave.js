// jshint ignore: start
var topWave;
var waves = [];
var amountOfWaves = 5;

function setup() {
    createCanvas(1360, 660);

    wave = new Wave(0);
    for(var i = 1; i <= amountOfWaves; i++){
        waves[i - 1] = new Wave();
        waves[i - 1] = Object.assign(waves[i - 1], wave);
        waves[i - 1].setupWave(width + 16);
        waves[i - 1].yoffset = i * 15;
    }
    wave.setupWave(width + 16);
};

function draw() {
    background(255);
    wave.calcWave();
    wave.renderWave();
    for(var i = 0; i < amountOfWaves; i++){
        waves[i].calcWave();
        waves[i].renderWave();
    }
};

var Wave = function(){
    this.xspacing = 8;
    this.yoffset = 0;
    this.maxwaves = 5;
    this.theta = 0.0;
    this.amplitude = [];
    this.dx = [];
    this.yvalues = [];
};
Wave.prototype.setupWave = function(w){
    for (var i = 0; i < this.maxwaves; i++) {
        this.amplitude[i] = random(8, 30);
        var period = random(100, 300); // How many pixels before the wave repeats
        this.dx[i] = (TWO_PI / period) * this.xspacing;
    }

    for (var i = 0; i < w / this.xspacing; i++)
        this.yvalues[i] = 0.0;
};
Wave.prototype.calcWave = function(){
    this.theta += 0.02;
    for (var i = 0; i < this.yvalues.length; i++)
        this.yvalues[i] = 0;
    
    for (var j = 0; j < this.maxwaves; j++) {
        var x = this.theta;

        for (var i = 0; i < this.yvalues.length; i++) {
            if (j % 2 == 0)
                this.yvalues[i] += sin(x) * this.amplitude[j] + this.yoffset;
            else 
                this.yvalues[i] += cos(x) * this.amplitude[j] + this.yoffset;

            x += this.dx[j];
        }
    }
};
Wave.prototype.renderWave = function(){
    stroke(0);
    fill(127,50);
    ellipseMode(CENTER);

    for (var x = 0; x < this.yvalues.length; x++)
        ellipse(x * this.xspacing, height / 3 + this.yvalues[x], 36, 36);
};