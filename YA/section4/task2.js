/* 2. Написать функцию myNew, чтобы она работала как конструктор, но без вызова new. */

function Person(name, age) {
  this.name = name;
  this.age = age;
}

function myNew(person, name, age) {

}

var person = myNew(person, "Vasia", 34);
console.log(person instanceof Person); // true;