/* 2. Написать функцию myNew, чтобы она работала как конструктор, но без вызова new. */

function Person(name, age) {
  this.name = name;
  this.age = age;
}
var person = myNew(person, "Vasia", 34);
person instanceOf Person // true;