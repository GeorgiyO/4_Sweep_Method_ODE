const {sweepMethodODESecondOrder} = require("../src/model/SweepMethodODESecondOrder");

let a = 0;
let b = 10;

sweepMethodODESecondOrder(
    (x) => 1,
    (x) => -2,
    a,
    b,
    1,
    -1,
    10,
    (x) => -2*x + 1
);