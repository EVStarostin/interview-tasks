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
                    next: [
                        {
                            value: 5,
                            next: null
                        }
                    ]
                }
            ]
        },
        {
            value: 6,
            next: null
        }
    ]
}


function sum(list) {
    let result = list.value;
    function sumRecursive(arr) {
        for (let i = 0; i < arr.length; i++) {
            result = result + arr[i].value;
            if (arr[i].next) {
                sumRecursive(arr[i].next);
            }
        }
    }
    if (list.next) sumRecursive(list.next);
    return result;
}

const x = sum(list);
console.log(x);
