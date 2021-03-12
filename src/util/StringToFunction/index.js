exports.stringToFX = function(str) {
    let f;
    eval(`f = function(x) {return ${str};}`);
    return f;
}