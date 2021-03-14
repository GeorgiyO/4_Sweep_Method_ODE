export {globalState}

const {DynamicProperty} = require("../util/Objects");
const {stringToFX} = require("../util/StringToFunction");
const {sweepMethodODESecondOrder} = require("./SweepMethodODESecondOrder");

const globalState = {
    parameters: {
        p: new DynamicProperty("1"),
        q: new DynamicProperty("-2"),
        a: new DynamicProperty("0"),
        b: new DynamicProperty("10"),
        A: new DynamicProperty("1"),
        B: new DynamicProperty("-1"),
        n: new DynamicProperty("10"),
        f: new DynamicProperty("-2*x + 1"),
    },
    result: new DynamicProperty([

    ])
}

for (let key in globalState.parameters) globalState.parameters[key].addListener(updateResult);
updateResult();

function updateResult() {
    let params = {};
    for (let key in globalState.parameters) params[key] = globalState.parameters[key].get();
    try {
        for (let key of ["p", "q", "f"]) {
            params[key] = stringToFX(params[key]);
            params[key](0);
        }
        for (let key of ["a", "b", "A", "B", "n"]) params[key] = Number(params[key]);
        let {p, q, f, a, b, A, B, n} = params;
        globalState.result.set(sweepMethodODESecondOrder(p, q, a, b, A, B, n, f));
    } catch (e) {
        console.log(e);
    }
}
