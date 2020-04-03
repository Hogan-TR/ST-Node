const fs = require('fs');
const request = require('request');
const htmlparser = require('htmlparser');
const configFilename = './rss_feeds.txt';

function checkForRSSFile() { // 确保包含 RSS 预订源 URL 列表地文件存在
    fs.exists(configFilename, (exists) => {
        if (!exists) {
            return next(new Error(`Missing RSS file: ${configFilename}`)); // 只要有错误就尽早返回
        }
        next(null, configFilename);
    });
}

function readRSSFile(configFilename) { // 读取并解析包含预订源 URL 的文件
    fs.readFile(configFilename, (err, feedList) => {
        if (err) {
            return next(err);
        }
        // 将预订源 URL 列表转换成字符串
        feedList = feedList.toString().replace(/^\s+|\s+$g/, '').split('\n');
        const random = Math.floor(Math.random() * feedList.length); // 随机决定
        next(null, feedList[random]);
    });
}

function downloadRSSFeed(feedUrl) { // 向选定的预订源发送 HTTP 请求以获取数据
    request({ url: feedUrl }, (err, res, body) => {
        if (err) {
            return next(err);
        }
        if (res.statusCode != 200) {
            return next(new Error('Abnormal response status code'));
        }
        next(null, body);
    });
}

function parseRSSFeed(rss) { // 将预订源数据解析到一个条目数组中
    const handler = new htmlparser.RssHandler();
    const parser = new htmlparser.Parser(handler);
    parser.parseComplete(rss);
    if (!handler.dom.items.length) {
        return next(new Error('No RSS items found'));
    }
    const item = handler.dom.items.shift();
    console.log(item.title); // 若有数据，显示第一个预订源条目的标题和 URL
    console.log(item.link);
}

const tasks = [ // 把所有要做的任务按执行顺序添加到一个数组中
    checkForRSSFile,
    readRSSFile,
    downloadRSSFeed,
    parseRSSFeed
];

function next(err, res) { // 执行next函数
    if (err) { // 若任务出错，则抛出异常
        throw err;
    }
    const currentTask = tasks.shift(); // 从任务数组中取出下一个任务
    if (currentTask) {
        currentTask(res);
    }
}

next(); // 开始任务的串行化执行