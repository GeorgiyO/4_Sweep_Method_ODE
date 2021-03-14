const solveTDM = require("tridiagonal-solve");

/**
 * @callback FX
 * @param {number} x
 * @returns {number}
 */
/**
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 */
/**
 * solve with sweep method for y'' + p*y' + q*y = f(x)
 * @param {FX} p - y' multiplier
 * @param {FX} q - y multiplier
 * @param {number} a - left arg value
 * @param {number} b - right arg value
 * @param {number} A - left func value
 * @param {number} B - right func value
 * @param {number} n - iterations count
 * @param {FX} f - f(x)
 * @returns {Point[]}
 */
module.exports.sweepMethodODESecondOrder = function (p, q, a, b, A, B, n, f) {

    if (a >= b) throw new TypeError("Bad [a, b]: b must be bigger than a")

    let h = (b - a) / n;

    let first = {
        x: a,
        y: A
    };
    let last = {
        x: b,
        y: B
    };

    a += h;
    b -= h;

    // create matrix:

    let matrix = {
        a: [],
        b: [],
        c: [],
        d: []
    }

    let x = a;
    for (let i = 0; i < n - 1; i++) {
        matrix.a.push(1 - h * p(x) / 2);
        x += h;
    }
    x = a;
    for (let i = 0; i < n; i++) {
        matrix.b.push(h ** 2 * q(x) - 2);
        x += h;
    }
    x = a + h;
    for (let i = 0; i < n - 1; i++) {
        matrix.c.push(1 + h * p(x) / 2);
        x += h;
    }

    // push values:
    x = a + h;
    matrix.d.push(h ** 2 * f(a) - A * (1 - h * p(a) / 2));
    for (let i = 0; i < n - 3; i++) {
        matrix.d.push(h ** 2 * f(x))
        x += h;
    }
    matrix.d.push(h ** 2 * f(b) - B * (1 - h * p(b) / 2));

    let matrixSolution = solveTDM(
        matrix.a,
        matrix.b,
        matrix.c,
        matrix.d
    );

    let result = [];
    x = a;
    result.push(first);
    for (let y of matrixSolution) {
        result.push({
            x,
            y
        });
        x += h;
    }
    result.push(last);

    return result;
}
