var config = {
    axiom : "F-F-F-F",
    generations : 4,
    reduction : 0.25,
    turtle : {
        startX : 330,
        startY : 330,
        omega : "F-F-F-F", // Should be the same as axiom above.
        delta : 90,
        d : 400,
    },
    productions : [
        {
            predecesor : "F",
            succesor : "FF-F-F-F-FF"
        }
    ]
};