const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('How do you ... ?', (answer) => {
    // TODO: ...
    console.log(`Thank for your answer: ${answer}`);

    // rl.close(); // 关闭接口
});

// line 事件
rl.on('line', (input) => {
    console.log(`Ac: ${input}`);
});

// SIGINT 事件
rl.on('SIGINT', () => {
    rl.question('Are you sure to quit?', (answer) => {
        if (answer.match(/^y(es)?$/i)) rl.pause();
    });
});

// rl.write('删除这个！');
// // 模拟 Ctrl+u 删除先前写入的行
// rl.write(null, { ctrl: true, name: 'u' });