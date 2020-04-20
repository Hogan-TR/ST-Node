/**
 * 顺序执行
 */
const Q = require('q');
const fs = require('fs');

function printFileContent(filename) {
    return function () {
        var defer = Q.defer();
        fs.readFile(filename, 'utf-8', function (err, data) {
            if (!err && data) {
                console.log(data);
                defer.resolve();
            }
        });
        return defer.promise;
    }
}
// 手动链接
printFileContent('sample01.txt')()
    .then(printFileContent('sample02.txt'))
    .then(printFileContent('sample03.txt'))
    .then(printFileContent('sample04.txt'));
