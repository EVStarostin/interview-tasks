/* 
    3. Найти сумму всех values

    {
    value: 4,
    next: [
        {
        value: 3,
        next: [...]
        },
        {
        value: 3,
        next: [...]
        },
        ...
    ]
    }
 */

const list = {
    value: 1,
    next: [
        {
            value: 2,
            next: [
                {
                    value: 3,
                    next: null
                },
                {
                    value: 4,
                    next: null
                }
            ]
        },
        {
            value: 5,
            next: null
        }
    ]
}


function sum(list) {
    let result = list.value;
  
    if (list.next) {
        sum(list.next); // (2)
    }
  }

const x = sum(list);
console.log(x);
