/* 闭包 */
// 使内部函数可以访问定义在外部函数中的变量
// adder 函数构造器
var adder = function (x) {
    var base = x;
    return function (n) {
        return base + n;
    }
}

var add10 = adder(10);
console.log('add10:', add10(5));

var add20 = adder(20);
console.log('add20:', add20(5));

// 坑 => 5 5 5 5 5
// setTimeout 中的 i 为对外层 i 的"引用"
for (var i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i);
    }, 5);
}
// 解决
// i => 局部变量 => 屏蔽外层迭代影响
for (var i = 0; i < 5; i++) {
    (function (tempI) {
        setTimeout(function () {
            console.log(tempI);
        }, 5);
    })(i);
}