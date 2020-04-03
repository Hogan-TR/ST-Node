const readFile = require('fs').readFile;
const yargs = require('yargs');

const argv = yargs
    .demand('f') // 需要 -f 才能运行
    .nargs('f', 1) // 告诉 yargs -f 后面要有参数值
    .describe('f', 'JSON file to parse')
    .argv;

const file = argv.f;
readFile(file, (err, dataBuffer) => {
    const value = JSON.parse(dataBuffer.toString());
    console.log(JSON.stringify(value));
});