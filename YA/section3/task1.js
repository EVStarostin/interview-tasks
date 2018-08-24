var moneyTypes = [5000, 1000, 500, 100, 50];
function getMoney(amount) {
   // нужно вернуть набор денег в следующем формате
   // {
   //   5000: 1,
   //   1000: 2,
   //   ....
   //   50: 5
   // }
   // Или бросить исключение, если вернуть деньги невозможно
    let rest = amount;
    const obj = {};
    let i = 0;

    while (rest > 0) {
        let moneyType = moneyTypes[i];
        if (moneyType === undefined) throw new Error('Нужную сумму выдать невозможно');
        let x = Math.floor(rest / moneyType);
        if (x > 0) {
            obj[moneyType] = x;
            rest -= moneyType * obj[moneyType];
        }
        i++;
    }
    return obj;
}

const x = getMoney(7250);
console.log(x);