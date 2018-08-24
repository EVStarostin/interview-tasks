var moneyTypes = [5000, 1000, 500, 100, 50];
var limits = {
    5000: 4,
    1000: 5,
    500: 2,
    100: 5,
    50: 100
  };
  function getMoney(amount, limits) {
     // нужно вернуть набор денег и обновленные лимиты
     // {
     //   res: {
     //     5000: 1,
     //     1000: 2,
     //     ....
     //     50: 5
     //   } || "warn" (если вернуть деньги невозможно)
     //  limits: // объект лимитов той же структуры с обновленными    данными
     // }
    let rest = amount;
    const obj = {};
    let i = 0;

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
    return obj;
  }

  const x = getMoney(30000, limits);
  console.log(x);