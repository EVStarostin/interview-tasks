/* 2. Написать функцию myNew, чтобы она работала как конструктор, но без вызова new. */

function Person(name, age) {
  this.name = name;
  this.age = age;
}

function myNew(Person, name, age) {
    const person = {name, age};
    person.__proto__ = Person.prototype;
    return person;
}

var person = myNew(Person, "Vasia", 34);
console.log(person instanceof Person); // true;