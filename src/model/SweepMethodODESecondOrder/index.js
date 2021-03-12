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
    let h = (b - a) / n;

    let first = {
        x: a,
        y: A
    };
    let last = {
        x: b,
        y: B
    };

    a += h * 2;
    b -= h * 2;

    // create matrix:

    let matrix = [];
    let matrixValues = [];

    // first row:
    matrix.push([
        (h ** 2 * q(a) - 2),
        (1 + h * p(a) / 2)
    ]);
    matrixValues.push(
        h ** 2 * f(a) - A * (1 - h * p(a) / 2)
    );

    // middle rows:
    for (let x = a; x <= b; x += h) {
        matrix.push([
            (1 - h * p(x) / 2),
            (h ** 2 * q(x) - 2),
            (1 + h * p(x) / 2)
        ]);
        matrixValues.push(
            h ** 2 * f(x)
        );
    }

    // last row:
    matrix.push([
        (1 - h * p(b) / 2),
        (h ** 2 * q(b) - 2)
    ]);
    matrixValues.push(
        h ** 2 * f(b)  - B * (1 - h * p(b) / 2)
    );

    // transform matrix to square-type:
    for (let i = 0; i < matrix.length - 2; i++) matrix[0].push(0);
    for (let i = 1; i < matrix.length; i++) {
        let left = [];
        for (let j = 0; j < i - 1; j++) left.push(0);
        matrix[i].unshift(...left);
        for (let j = 0; j < matrix.length - 3 - i + 1; j++) matrix[i].push(0);
    }

    // solve matrix:
    // straight:

    let v = [];
    let u = [];

    let pushToU = function(i) {
        u.push(
            (matrix[i][i - 1] * u[i - 1] - matrixValues[i]) /
            (-matrix[i][i] - matrix[i][i - 1] * v[i - 1])
        );
    }

    // first row:
    v.push(
        matrix[0][1] / -matrix[0][0]
    );
    u.push(
        -matrixValues[0] / -matrix[0][0]
    )

    // middle rows:
    for (let i = 1; i < matrix.length - 1; i++) {
        v.push(
            matrix[i][i + 1] /
            (-matrix[i][i] - matrix[i][i - 1] * v[i - 1])
        );
        pushToU(i);
    }

    // last row:
    v.push(0);
    pushToU(matrix.length - 1);

    // reverse:
    let result = new Array(matrix.length + 1);
    result[matrix.length] = {
        x: b + h,
        y: u[matrix.length - 1]
    };
    let xi = b;
    for (let i = matrix.length - 1; i > 0; i--) {
        result[i] = {
            x: xi,
            y: v[i - 1] * result[i + 1].y + u[i - 1]
        }
        xi -= h;
    }
    result[0] = first;
    result.push(last);

    console.log(result);
}
