// 3. Написать функцию sum чтобы выражение sum(1)(2)(5)(10) возвращало 18.
function sum(a) {
  let currentSum = a;

  function f(b) {
    if (b === undefined) return currentSum;
    currentSum += b;
    return f;
  }

  return f;
}
  
let x = sum(1)(2)(5)(10)();
console.log(x);