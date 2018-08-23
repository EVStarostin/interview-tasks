
/* Реализовать функции five, add, one, seven, subtract, two, чтобы работало: */
function one() {
    return 1;
}
function add(x) {
    return function(y) {
        return y + x;   
    };
}
function five(func) {
    const x = 5;
    return func(x);
}
const x = five(add(one())) // 6
console.log(x);

function two() {
    return 2;
}
function subtract(x) {
    return function(y) {
        return y - x;   
    };
}
function seven(func) {
    const x = 7;
    return func(x);
}
const y = seven(subtract(two())) // 5
console.log(y);
