// 1. Написать функцию getPrimes(n) // Должна вернуть простые числа от 2 до n;
function getPrimes(n) {
  const primesArray = [];
  for (let i = 2; i <= n; i += 2) {
    primesArray.push(i);
  }
  return primesArray;
}

const x = getPrimes(10);
console.log(x.join('; '));