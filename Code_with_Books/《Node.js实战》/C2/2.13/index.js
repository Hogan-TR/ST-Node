const fs = require('fs');
const tasks = [];
const wordCounts = {};
const filesDir = './text';
let completedTasks = 0;

function checkIfComplete() { //检查是否全部完成 + 展示
    completedTasks++;
    if (completedTasks === tasks.length) { // 当所有任务完成后，列出文件中用到的每个单词以及用了多少次
        for (let index in wordCounts) {
            console.log(`${index}: ${wordCounts[index]}`);
        }
    }
}

function addWordCount(word) { // 单词计数 (+1)
    wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1;
}

function coutWordsInText(text) { // 单个文本处理
    const words = text.toString().toLowerCase().split(/\W+/).sort();
    words
        .filter(word => word)
        .forEach(word => addWordCount(word));// 对文本中出现的单词计数
}

fs.readdir(filesDir, (err, files) => { // 得出 text 目录中的文件列表
    if (err) throw err;
    files.forEach(file => {
        const task = (file => {
            return () => { // 返回函数对象(未执行)
                fs.readFile(file, (err, text) => {
                    if (err) throw err;
                    coutWordsInText(text);
                    checkIfComplete();
                });
            }
        })(`${filesDir}/${file}`); // 闭包 固定file
        tasks.push(task); // 将所有任务都添加到函数调用数组中
    });
    tasks.forEach(task => task()); // 开始并行执行所有任务
});