/* this */
// 1. 有对象  ->指向调用对象
// 2. 没调用对象  ->全局对象
// 3. 用 new 构造  -> 新对象
// 4. 通过 apply / call / bind  ->改变所指

// case - 1
var myObject = { value: 100 };
myObject.getValue = function () {
    console.log(this.value); // => 100
    console.log(this); // => { value: 100, getValue: [Function]}
    return this.value;
};
console.log(myObject.getValue()); // => 100

// case - 2
// foo 虽然定义在 getValue 的函数体内
// 但既不属于 getValue 也不属于 myObject, 未被绑定在任何对象上
// this -> global
var myObject = { value: 100 };
myObject.getValue = function () {
    var foo = function () {
        console.log(this.value); // => undefined
        console.log(this); // => 全局变量 global
    };
    foo();

    return this.value;
}
console.log(myObject.getValue()); // => 100

// case - 3
var SomeClass = function () {
    this.value = 100;
}
var myCreate = new SomeClass();
console.log(myCreate.value); // => 100
// 注: js中, 构造函数、普通函数、对象方法、闭包，无明确界限

// case - 4
// apply / call 调用和 bind 绑定
// => 指向绑定对象
var myObject = { value: 100 };

var foo = function () {
    console.log(this);
}

foo(); // => global
// apply() 方法接受两个参数第一个是函数运行的作用域，另外一个是一个参数数组(arguments)
foo.apply(myObject); // { value: 100 }
// call() 方法第一个参数的意义与 apply() 方法相同，只是其他的参数需要一个个列举出来
foo.call(myObject); // { value: 100 }

var newFoo = foo.bind(myObject);
newFoo(); // { value: 100 }