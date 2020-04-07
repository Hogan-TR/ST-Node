// 4.2.2 难点
// <1>异常处理
// 在下一个事件循环内执行，当前循环无法对callback抛出的异常
var async = function (callback) {
    process.nextTick(callback);
}
try {
    async(callback);
} catch (e) {
    // TODO
}

// 原则
// 必须执行调用者传入的回调函数callback
// 正确传递回异常供调用者判断
var async = function (callback) {
    process.nextTick(function () {
        var results = something;
        if (error) {
            return callback(error);
        }
        callback(null, results);
    });
};

// <2>函数嵌套过深
// 遍历目录
const fs = require('fs');
fs.readdir(path.join(__dirname, '..'), function (err, files) {
    files.forEach(function (filename, index) {
        fs.readFile(filename, 'utf8', function (err, file) {
            // TODO
        });
    });
});

// <3>阻塞代码
// js中没有sleep()这样的线程沉睡功能
// 利用setTimeout()解决，而非利用循环一直占用cpu

// <4>多线程编程
// 基础API - child_process
// cluster模块

// <5>异步转同步