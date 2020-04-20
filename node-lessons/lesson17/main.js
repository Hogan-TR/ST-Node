/* Promise - Deferred */
// Pyramid of Doom
// 邪恶金字塔
const fs = require('fs');
fs.readFile('sample01.txt', 'utf-8', function (err, data) {
    console.log(data);
    fs.readFile('sample02.txt', 'utf-8', function (err, data) {
        console.log(data);
    })
});

// Promise 三状态: 未完成 完成(fulfilled) 失败(rejected)
// promise => then 方法，接受三个参数
promiseSomething.then(function (fulfilled) {
    // status => fulfilled
}, function (rejected) {
    // status => rejected
}, function (progress) {
    // 当返回进度信息时，调用
});
// ex - demo
var Q = require('q');
var defer = Q.defer();
/**
 * 获取初始promise
 * @private
 */
function getInitialPromise() {
    return defer.promise;
}
/**
 * 为promise设置三种状态的回调函数
 */
getInitialPromise().then(function (success) {
    console.log(success);
}, function (error) {
    console.log(error);
}, function (progress) {
    console.log(progress);
});
defer.notify('in progress');//控制台打印in progress
defer.resolve('resolve');   //控制台打印resolve
defer.reject('reject');     //没有输出。promise的状态只能改变一次