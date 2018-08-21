// 2. Написать функцию, проверяющую правильно расставленные скобки;
function check(str) {
  const openBrackets = {
    "{":"}",
    "(":")",
    "[":"]",
  };

  const stack = [];
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    const lastBracketInStack = stack[stack.length-1]
    if (openBrackets[c]) {
      stack.push(c);
    } else if (c === openBrackets[lastBracketInStack]) {
      stack.pop();
    }
  }
  return !stack.length;
}

const a = check("{()}[]"); // true
console.log(a);
const b = check("{[}]"); // false
console.log(b);
