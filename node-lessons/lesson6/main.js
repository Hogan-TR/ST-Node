var fibonacci = function (n) {
    if (n === 0) {
        return 0;
    } else if (n === 1) {
        return 1
    } else if (n > 1) {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}

if (require.main === module) {
    // 直接执行 main.js
    var n = Number(process.argv[2]);
    console.log('fibonacci(' + n + ') is', fibonacci(n));
}

exports.fibonacci = fibonacci;