const http = require('http');
const fs = require('fs');

http.createServer((req, res) => { // 客户端请求一开始会进入到这里
    if (req.url == '/') {
        getTitles(res); // 控制权转交给 getTitles
    }
}).listen(8000, 'localhost');

function getTitles(res) { // 获取标题，并将控制权转交给 getTemplate
    fs.readFile('./title.json', (err, data) => {
        if (err) {
            hadError(err, res);
        } else {
            getTemplate(JSON.parse(data.toString()), res);
        }
    });
}

function getTemplate(titles, res) { // 读取模板文件，并将控制权转交给 formatHtml
    fs.readFile('./template.html', (err, data) => {
        if (err) {
            hadError(err, res);
        } else {
            formatHtml(titles, data.toString(), res);
        }
    });
}

function formatHtml(titles, tmpl, res) { // 得到标题和模板，渲染一个响应给客户端
    const html = tmpl.replace('%', titles.join('</li><li>'));
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
}

function hadError(err, res) { // 集中Error处理模块
    console.error(err);
    res.end('Server Error');
}

