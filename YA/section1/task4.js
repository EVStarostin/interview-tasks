// 4. Написать функцию getAnagrams
function getAnagrams() {
  for (let i = 0; i < arguments.length; i++) {
    const argument = arguments[i];
    console.log(argument);
  }
}

getAnagrams("нос", "сон", "снедь", "днесь");
