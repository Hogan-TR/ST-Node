const Q = require('q');
const fs = require('fs');
const defer = Q.defer();

function getInitPromise() {
    return defer.promise;
}

getInitPromise().then(function (filename) {
    var myDefer = Q.defer();
    fs.readFile(filename, 'utf-8', function (err, data) {
        if (!err && data) {
            console.log(data);
            myDefer.resolve(data);
        } else {
            myDefer.reject(err);
        }
    });
    return myDefer.promise;
}).then(function (filename) {
    var myDefer2 = Q.defer();
    fs.readFile(filename, 'utf-8', (err, data) => {
        if (!err && data) {
            console.log(data);
            myDefer2.resolve(data);
        } else {
            myDefer2.reject(err);
        }
    });
    return myDefer2.promise;
}).done();

defer.resolve('test1.txt');