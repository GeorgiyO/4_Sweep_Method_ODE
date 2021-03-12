export {globalState}

const {DynamicProperty} = require("../util/Objects");
const {stringToFX} = require("../util/StringToFunction");
const {sweepMethodODESecondOrder} = require("./SweepMethodODESecondOrder");

const globalState = {
    parameters: new DynamicProperty({
        p: "1",
        q: "-2",
        a: "0",
        b: "10",
        A: "1",
        B: "-1",
        n: "10",
        f: "-2*x + 1",
    }),
    result: new DynamicProperty([

    ])
}


globalState.parameters.addListener(updateResult);
updateResult();

function updateResult() {
    let params = globalState.parameters.get();
    try {
        for (let key of ["p", "q", "f"]) params[key] = stringToFX(params[key]);
        for (let key of ["a", "b", "A", "B", "n"]) params[key] = Number(params[key]);
    } catch (e) {
        console.log(e);
    }
    let {p, q, f, a, b, A, B, n} = params;
    globalState.result.set(sweepMethodODESecondOrder(p, q, a, b, A, B, n, f));
}
