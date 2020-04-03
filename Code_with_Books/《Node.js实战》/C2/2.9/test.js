// function asyncFunction(callback) {
//     setTimeout(callback, 200);
// }
// let color = 'blue';
// asyncFunction(() => {
//     console.log(`The color is ${color}`);
// });
// color = 'green';

function asyncFunction(callback) {
    setTimeout(callback, 200);
}
let color = 'blue';
// 闭包
(color => {
    asyncFunction(() => {
        console.log('The color is', color);
    });
})(color);
color = 'green';
