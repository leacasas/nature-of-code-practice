// jshint ignore: start
// An LSystem has a starting sentence and a ruleset.
// Each generation recursively replaces characteres in the sentence based on the ruleset.
function LSystem(axiom, rules){
    this.sentence = axiom;
    this.ruleset = rules;
    this.generation = 0;
};
LSystem.prototype.generate = function(){
    var nextgen = "";
    for(var i = 0; i < this.sentence.length; i++){
        var current = this.sentence[i];
        var replace = "" + current;
        for(var j = 0; j < this.ruleset.length; j++){
            var a = this.ruleset[j].predecesor;
            if(a == current){
                replace = this.ruleset[j].succesor;
                break;
            }
        }
        nextgen += replace;
    }
    this.sentence = nextgen;
    this.generation++;
};