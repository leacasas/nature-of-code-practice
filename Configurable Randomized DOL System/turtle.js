// jshint ignore: start
function Turtle(turtleConf){
    this.todo = turtleConf.omega;
    this.len = turtleConf.d;
    this.theta = radians(turtleConf.delta);
    this.x = turtleConf.startX;
    this.y = turtleConf.startY;
};
Turtle.prototype.render = function(){
    stroke(200);
    for(var i = 0; i < this.todo.length; i++){
        var char = this.todo[i];
        if(char === 'F' || char === 'G'){
            line(0, 0, 0, -this.len);
            translate(0, -this.len);
        }else if(char === '+'){
            rotate(this.theta);
        }else if(char === 'f'){
            translate(0, -this.len);
        }else if(char === '-'){
            rotate(-this.theta);
        }else if(char === '['){
            push();
        }else if(char === ']'){
            pop();
        }
    }
};
Turtle.prototype.changeLen = function(percent){
    this.len *= percent;    
};