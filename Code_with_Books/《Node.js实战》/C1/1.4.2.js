// 使用核心模块 + 流
// const fs = require('fs');
// const zlib = require('zlib');
// const gzip = zlib.createGzip();
// const outStream = fs.createWriteStream('output.js.gz');

// fs.createReadStream('./hello.txt')
//     .pipe(gzip)
//     .pipe(outStream);


// http模块
const http = require('http');
const port = 8080;

const server = http.createServer((req, res) => {
    res.end('Hello World!');
});

server.listen(port, () => {
    console.log('Server listening on: http://localhost:%s', port);
});