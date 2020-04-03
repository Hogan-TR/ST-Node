const app = require('connect')();

function setup(format) {
    const regexp = /:(\w+)/g;
    return function createLogger(req, res, next) {
        const str = format.replace(regexp, (match, property) => {
            // match -> :method  property -> method
            return req[property];
        });
        console.log(str);
        next();  // 将控制权交给下一个中间件
    }
}

app
    .use(setup(':method :url'))
    .listen(3000);