var moneyTypes = [5000, 1000, 500, 100, 50, 30];
var limits = {
    5000: 4,
    1000: 5,
    500: 2,
    100: 5,
    50: 100,
    30: 23
};
  function getMoney(amount, limits) {
    let rest = amount;
    let obj = {};
    let initial = 0;

    while (initial < moneyTypes.length && rest > 0) {
        try {
            let i = initial;
            while (rest > 0) {
                let moneyType = moneyTypes[i];
                if (moneyType === undefined) throw new Error('Нужную сумму выдать невозможно');
                let x = Math.floor(rest / moneyType);
                if (x > limits[moneyType]) x = limits[moneyType];
                if (x > 0) {
                    obj[moneyType] = x;
                    rest -= moneyType * obj[moneyType];
                }
                i++;
            }
        } catch (error) {
            obj = {};
            initial++;
            if (moneyTypes[initial] === undefined) throw new Error('Нужную сумму выдать невозможно');
            rest = amount;
        }
    }
    return obj;
}

const x = getMoney(120, limits);
console.log(x);