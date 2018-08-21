// 4. Написать функцию getAnagrams
function getAnagrams() {
  const sortAlphabetically = (str) => {
    return str.split('').sort().join('');
  }

  const args = Array.prototype.slice.call(arguments);
  const sortedArguments = args.map( el => sortAlphabetically(el) );

  const anagrams = [];
  for (let i = 0; i < args.length; i++) {
    const sortedArgument = sortAlphabetically(args[i]);
    
    const curAnagrams = [];
    let idx = sortedArguments.indexOf(sortedArgument, i);
    while (idx != -1) {
      curAnagrams.push(args[idx]);
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