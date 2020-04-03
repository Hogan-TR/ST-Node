const readline = require('readline');
const request = require('request');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '请输入> '
});


rl.prompt();

rl.on('line', (line) => {
    keyboardGet = line.trim(); // get typed words
    request.post('https://api.ownthink.com/bot', {
        form: {
            spoken: keyboardGet,
            appid: 'xxx', // need to apply for
            userid: 'test'
        }
    }, (err, response, body) => {
        infoGet = JSON.parse(body);
        console.log(infoGet.data.info.text);
        rl.prompt();
    });

}).on('close', () => {
    console.log('Bye~');
    process.exit(0);
});

