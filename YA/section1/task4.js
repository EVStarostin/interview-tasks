// 4. Написать функцию getAnagrams
function getAnagrams() {
  const sortAlphabetically = (str) => {
    return str.split('').sort().join('');
  }

  const sortedArguments = Array.prototype.slice.call(arguments).map( el => sortAlphabetically(el) );
  const anagrams = [];
  for (let i = 0; i < arguments.length; i++) {
    const sortedArgument = sortAlphabetically(arguments[i]);
    const curAnagrams = [];
    let idx = sortedArguments.indexOf(sortedArgument, i);
    while (idx != -1) {
      curAnagrams.push(arguments[idx]);
      delete sortedArguments[idx];
      idx = sortedArguments.indexOf(sortedArgument, idx + 1);
    }

    if (curAnagrams.length > 1) anagrams.push(curAnagrams);
  }

  return anagrams;
}

const x = getAnagrams("нос", "сон", "снедь", "днесь");
console.log(JSON.stringify(x));
/* 
[
  ["нос", "сон"],
  ["днесь", "снедь"]
] 
*/