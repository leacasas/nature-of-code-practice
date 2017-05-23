// jshint ignore: start

function Turtle(todo, len, theta){
    this.todo = todo;
    this.len = len;
    this.theta = theta;
};
Turtle.prototype.render = function(){
    stroke(0, 175);
    for(var i = 0; i < this.todo.length; i++){
        var char = this.todo[i];
        if(char === 'F' || char === 'G'){
            line(0, 0, this.len, 0);
            translate(this.len, 0);
        }else if(char === '+'){
            rotate(this.theta);
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