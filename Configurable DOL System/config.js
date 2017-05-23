var config = {
    axiom : "F-F-F-F",
    generations : 5,
    reduction : 0.25,
    turtle : {
        startX : 300,
        startY : 300,
        omega : "F-F-F-F",
        delta : 90,
        d : 165,
    },
    productions : [
        {
            predecesor : "F",
            succesor : "F-F+F+FF-F-F+F"
        }
    ]
};