/** 并行
 * Q.all([promise1,promise2...])
 * 将多个promise组合成一个promise返回
 * 1. 当all里面所有的promise都fulfil时，Q.all返回的promise状态变成fulfil
 * 2. 当任意一个promise被reject时，Q.all返回的promise状态立即变成reject
 */
const Q = require('q');
const fs = require('fs');

/**
 *读取文件内容
 *@private
 */
function printFileContent(filename) {
    var defer = Q.defer();
    fs.readFile(filename, 'utf-8', function (err, data) {
        if (!err && data) {
            console.log(data);
            defer.resolve(filename + ' success');
        } else {
            defer.reject(filename + ' fail');
        }
    });
    return defer.promise;
}

// Q.all任意一个 promise 进入 rejected 状态立即进入 reject 状态
Q.all([
    printFileContent('sample01.txt'),
    printFileContent('sample02.txt'),
    printFileContent('sample03.txt'),
    printFileContent('sample04.txt')
]).then(function (success) {
    console.log(success);
});

// 等到所有 promise 都发生状态改变后，再转换 Q.all 状态
Q.allSettled([
    printFileContent('sample01.txt'),
    printFileContent('sample02.txt'),
    printFileContent('sample03.txt'),
    printFileContent('sample04.txt')
]).then(function (results) {
    results.forEach(function (result) {
        console.log(result.state);
    });
});