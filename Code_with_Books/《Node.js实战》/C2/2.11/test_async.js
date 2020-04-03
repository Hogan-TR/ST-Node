const async = require('async');
async.series([
    callback => {
        setTimeout(() => {
            console.log('I execute first.');
            callback();
        }, 1000);
    },
    callback => {
        setTimeout(() => {
            console.log('I execute next.');
            callback();
        }, 500);
    },
    callback => {
        setTimeout(() => {
            console.log('I execute last.');
            callback();
        }, 100);
    }
]);

// 给 Async 一个函数数组，让它一个接一个地执行