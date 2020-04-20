/* promise 传递 */
/** ①
 * 当function(fulfilled)或者function(rejected)返回一个值，
 * 比如一个字符串，数组，对象等等，那么outputPromise的状态就会变成fulfilled
 */

const Q = require('q');
const defer = Q.defer();

/**
 * 通过defer获得promise
 * @private
 */
function getIniticalPromise() {
    return defer.promise;
}

/**
 * 当inputPromise状态由未完成变成fulfil时，调用function(fulfilled)
 * 当inputPromise状态由未完成变成rejected时，调用function(rejected)
 * 将then返回的promise赋给outputPromise
 * function(fulfilled) 和 function(rejected) 通过返回字符串将outputPromise的状态由
 * 未完成改变为fulfilled
 * @private
 */
var outputPromise = getIniticalPromise().then(function (fulfilled) {
    return 'fulfilled';
}, function (rejected) {
    return 'rejected';
});

/**
 * 当outputPromise状态由未完成变成fulfil时，调用function(fulfilled)，控制台打印'fulfilled: fulfilled'。
 * 当outputPromise状态由未完成变成rejected, 调用function(rejected), 控制台打印'rejected: rejected'。
 */
outputPromise.then(function (fulfilled) {
    console.log('fulfilled: ' + fulfilled);
}, function (rejected) {
    console.log('rejected: ' + rejected);
});

/**
 * 将inputPromise的状态由未完成变成rejected
 */
defer.reject(); //输出 fulfilled: rejected

/**
 * 将inputPromise的状态由未完成变成fulfilled
 */
// defer.resolve(); //输出 fulfilled: fulfilled