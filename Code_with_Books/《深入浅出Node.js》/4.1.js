// 4.1.1 · 高阶函数
// 函数作为返回值
function foo(x) {
    return function () {
        return x;
    };
}
console.log(foo(10)());

// 函数作为参数
// 后续传递
function func(w) {
    return w;
}
function foo2(x, bar) {
    return bar(x);
}
console.log(foo2(1, func));


// 4.1.2 · 偏函数
// -> 通过指定部分参数，产生新的定制函数
// 类型判断(原)
var toString = Object.prototype.toString;
var isString = function (obj) {
    return toString.call(obj) == '[object String]';
};
var isFunction = function (obj) {
    return toString.call(obj) == '[object Function]';
};
// 新 批量创建
var toString = Object.prototype.toString;
var isType = function (type) {
    return function (obj) {
        return toString.call(obj) == '[object ' + type + ']'
    };
};
var isString = isType('String');
var isFunction = isType('Function');


