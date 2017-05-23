var config = {
    axiom : "F-F-F-F",
    generations : 5,
    reduction : 0.25,
    turtle : {
        startX : 300,
        startY : 300,
        omega : "F-F-F-F", // Should be the same as axiom above.
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