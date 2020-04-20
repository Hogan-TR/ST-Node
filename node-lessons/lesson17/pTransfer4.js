/**
 * 方法传递
 * => 当一个状态没有响应的回调函数，就会沿着then往下找
 */



/**
 * 没有提供function(rejected)
 * 如果inputPromise的状态由未完成变成rejected, 
 * 此时对rejected的处理会由outputPromise来完成。
 */
var Q = require('q');
var fs = require('fs');
var defer = Q.defer();
/**
 * 通过defer获得promise
 * @private
 */
function getInputPromise() {
	return defer.promise;
}
/**
 * 当inputPromise状态由未完成变成fulfil时，调用function(fulfilled)
 * 当inputPromise状态由未完成变成rejected时，这个rejected会传向outputPromise
 */
var outputPromise = getInputPromise().then(function(fulfilled){
	return 'fulfilled'
});
outputPromise.then(function(fulfilled){
	console.log('fulfilled: ' + fulfilled);
},function(rejected){
	console.log('rejected: ' + rejected);
});
/**
 * 将inputPromise的状态由未完成变成rejected
 */
defer.reject('inputpromise rejected'); //控制台打印rejected: inputpromise rejected

/**
 * 将inputPromise的状态由未完成变成fulfilled
 */
//defer.resolve();



/**
 * 没有提供function(fulfilled)
 * 如果inputPromise的状态由未完成变成fulfilled, 
 * 此时对fulfil的处理会由outputPromise来完成。
 */
var Q = require('q');
var fs = require('fs');
var defer = Q.defer();
/**
 * 通过defer获得promise
 * @private
 */
function getInputPromise() {
	return defer.promise;
}
/**
 * 当inputPromise状态由未完成变成fulfil时，传递给outputPromise
 * 当inputPromise状态由未完成变成rejected时，调用function(rejected)
 * function(fulfilled)将新的promise赋给outputPromise
 * 未完成改变为reject
 * @private
 */
var outputPromise = getInputPromise().then(null,function(rejected){
	return 'rejected';
});
outputPromise.then(function(fulfilled){
	console.log('fulfilled: ' + fulfilled);
},function(rejected){
	console.log('rejected: ' + rejected);
});
/**
 * 将inputPromise的状态由未完成变成rejected
 */
//defer.reject('inputpromise rejected');
/**
 * 将inputPromise的状态由未完成变成fulfilled
 */
defer.resolve('inputpromise fulfilled'); //控制台打印fulfilled: inputpromise fulfilled



/**
 * 可以使用fail(function(error))来专门针对错误处理，
 * 而不是使用then(null,function(error))
 */
var Q = require('q');
var fs = require('fs');
var defer = Q.defer();
/**
 * 通过defer获得promise
 * @private
 */
function getInputPromise() {
	return defer.promise;
}
/**
 * 当inputPromise状态由未完成变成fulfil时，调用then(function(fulfilled))
 * 当inputPromise状态由未完成变成rejected时，调用fail(function(error))
 * function(fulfilled)将新的promise赋给outputPromise
 * 未完成改变为reject
 * @private
 */
var outputPromise = getInputPromise().then(function(fulfilled){
	return fulfilled;
}).fail(function(error){
	console.log('fail: ' + error);
});
/**
 * 将inputPromise的状态由未完成变成rejected
 */
defer.reject('inputpromise rejected');//控制台打印fail: inputpromise rejected
/**
 * 将inputPromise的状态由未完成变成fulfilled
 */
//defer.resolve('inputpromise fulfilled');



/**
 * 可以使用progress(function(progress))来专门针对进度信息进行处理，而不是使用
 * then(function(success){},function(error){},function(progress){})
 */
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
 * 为promise设置progress信息处理函数
 */
var outputPromise = getInitialPromise().then(function(success){
}).progress(function(progress){
	console.log(progress);
});
defer.notify(1);
defer.notify(2); //控制台打印1，2