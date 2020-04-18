/* var的作用域 */
// 内部函数可以访问外部函数的变量，外部不能访问内部函数的变量
var parent = function () {
    var name = "parent_name";
    var age = 13;

    var child = function () {
        var name = "child_name";
        var childAge = 0.3;

        // => child_name 13 0.3
        console.log(name, age, childAge);
    };

    child();

    // will throw Error
    // ReferenceError: childAge is not defined
    console.log(name, age, childAge);
};
parent();

// 若忘记 var, 变量则成为全局变量
function foo() {
    value = "Hello";
}
foo(); // 不可少
console.log(value);
console.log(global.value);

// js 变量是函数级的
function foo2() {
    for (var i = 0; i < 10; i++) {
        var value = "Hello world";
    }
    console.log(i);  // 10
    console.log(value); // Hello world
}
foo2();

// es6 => 块级作用域 let