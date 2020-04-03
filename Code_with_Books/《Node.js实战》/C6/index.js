// const app = require('connect')();

// // 传给use的为中间件
// app.use((req, res, next) => {
//     console.log('%s %s', req.method, req.url);
//     next();
// }).use((req, res) => {
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello world!');
// }).listen(3000);

// const connect = require('connect');
// function logger(req, res, next) {
//     console.log('%s %s', req.method, req.url);
//     next();
// }
// function hello(req, res) {
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('hello world');
// }
// const app = connect()
//     .use(hello)
//     .use(logger)
//     .listen(3000);


const app = require('connect')();
app
    .use((req, res, next) => {
        foo();
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello world!');
    })
    .use(require('./newerror'))
    .listen(3000);