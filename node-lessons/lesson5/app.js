/* 控制并发数 */
// mapLimit or queue
// 并发连接数的计数器
var concurrencyCount = 0;
var fetchUrl = function (url, callback) {
    var delay = parseInt((Math.random() * 10000000) % 2000, 10);
    concurrencyCount++;
    console.log('现在的并发数是', concurrencyCount, ', 正在抓取的是', url, ', 耗时', delay, '毫秒');
    setTimeout(function () {
        concurrencyCount--;
        callback(null, url + ' html content');
    }, delay);
}

// 伪造链接
var urls = [];
for (var i = 0; i < 30; i++) {
    urls.push('http://datasource_' + i)
}

// 使用 async.mapLimit 来并发抓取，获取结果
const async = require('async');
async.mapLimit(urls, 5, function (url, callback) {
    fetchUrl(url, callback);
}, function (err, result) { // result -> list
    console.log('final:');
    console.log(result);
});