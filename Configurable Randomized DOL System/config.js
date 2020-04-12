// jshint ignore: start
var config = {
    axiom : "F+F+F+F",
    generations : 4,
    reduction : 0.35,
    turtle : {
        startX : 330,
        startY : 500,
        omega : "F+F+F+F", // Should be the same as axiom above.
        delta : 90,
        d : 200,
    },
    productions : [
        {
            predecesor : "F",
            succesor : "FF-F-F-F-F-F+F"
        }
    ]
};

function randomizeConfig(){
    var newAxiom = generateRandomStringFromAlphabet(14);
    // Config
    config.axiom = newAxiom;
    config.generations = round(random(2, 5));
    config.reduction = random(0.1, 0.75);
    // Turtle
    config.turtle.omega = newAxiom;
    config.turtle.delta = random(0, 180);
    config.turtle.d = round(random(2, 300));
    // Productions
    config.productions = generateProductions();

    console.log(config);
}

function generateRandomStringFromAlphabet(maxSize){
    var alphabet = "FGf+-[]"
    var al = alphabet.length;
    var axiom = "";
    for(var i = round(random(1, maxSize)); i > 0; i--){
        axiom += alphabet[round(random(0, al-1))];
    }
    return axiom;
}

function generateProductions(){
    var alphabet = "FGf+-[]"
    var prods = [];
    for(var i = round(random(1, alphabet.length)); i > 0; i--){
        var c = alphabet[round(random(0, alphabet.length-1))]
        prods.push({
            predecesor : c,
            succesor : generateRandomStringFromAlphabet(14)
        })
        alphabet = alphabet.replace(c, "");
    }
    return prods;
}