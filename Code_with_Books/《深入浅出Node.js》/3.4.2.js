// // 立即异步执行一个任务
// setTimeout(function () {
//     // TODO
// }, 0); // 浪费性能

// // 轻量版 更高效
// // 仅将回调函数放入队列中
// // process.nextTick = function (callback) {
// //     // on the way out, don't bother.
// //     // it won't get fired anyway
// //     if (process._exiting) return;

// //     if (tickDepth >= process.maxTickDepth)
// //         maxTickWarn();

// //     var tock = { callback: callback };
// //     if (process.domain) tock.domain = process.domain;
// //     nextTickQueue.push(tock);
// //     if (nextTickQueue.length) {
// //         process._needTickCallback();
// //     }
// // };
// process.nextTick(function(){
//     console.log('延迟执行');
// });
// console.log('正常执行');

// // setImmediate
// setImmediate(function(){
//     console.log('延迟执行');
// });
// console.log('正常执行');

// // setImmediate & process.nextTick 优先级比较
// process.nextTick(() => {
//     console.log('nextTick延迟执行');
// });
// setImmediate(() => {
//     console.log('setImmediate延迟执行');
// });
// console.log('正常执行');
// // nextTick优先级更高
// // process.nextTick -> idle观察者
// // setImmediate    -> check观察者

// nextTick 保存于数组 全部执行
// setImmediate 保存于链表 执行一个
process.nextTick(function () {
    console.log('nextTick延迟执行1');
});
process.nextTick(function () {
    console.log('nextTick延迟执行2');
});
setImmediate(function () {
    console.log('setImmediate延迟执行1');
});
setImmediate(function () {
    console.log('setImmediate延迟执行2');
});
console.log('正常执行');