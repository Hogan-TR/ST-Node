const concat = require('mississippi').concat;
const readFile = require('fs').readFile;
const yargs = require('yargs');

const argv = yargs
    .usage('parse-json [options]')
    .help('h')
    .alias('h', 'help')
    .demand('f')
    .nargs('f', 1)
    .describe('f', 'JSON file to parse')
    .argv;
const file = argv.f;

function parse(str) {
    const value = JSON.parse(str);
    console.log(JSON.stringify(value));
}

if (file === '-') {
    process.stdin.pipe(concat(parse)); // 管道读取
} else {
    readFile(file, (err, dataBuffer) => {
        if (err) {
            throw err;
        } else {
            parse(dataBuffer.toString());
        };
    });
}