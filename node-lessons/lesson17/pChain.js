const Q = require('q');
const defer = Q.defer();

// 一个模拟数据库
const users = [{ 'name': 'andrew', 'passwd': 'password' }];

function getUsername() {
    return defer.promise;
}

function getUser(username) {
    var user;
    users.forEach(function (element) {
        if (element.name === username) {
            user = element;
        }
    });
    return user;
}

// promise 链
// 顺序执行
getUsername().then(function (username) {
    return getUser(username);
}).then(function (user) {
    console.log(user);
});

defer.resolve('andrew');

// 动态构造 promise 链
var funcs = [foo, bar, baz, qux];
var result = Q(initialVal);
funcs.forEach(function (func) {
    result = result.then(func);
});
return result;
// 简洁版
var funcs = [foo, bar, baz, qux]
funcs.reduce(function (pre, current) {
    return pre.then(current);
}, Q(initialVal));


// ex - demo
function foo(result) {
    console.log(result);
    return result + result;
}
// 手动链接
Q('hello').then(foo).then(foo).then(foo);
/** Output
 * hello
 * hellohello
 * hellohellohellohello
 */
// 动态链接
var funcs = [foo, foo, foo];
var result = Q('hello');
funcs.forEach(function (func) {
    result = result.then(func);
});
// 精简后的动态链接
funcs.reduce(function (pre, current) {
    return pre.then(current);
}, Q('hello'));