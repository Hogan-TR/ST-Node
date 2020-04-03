const http = require('http');
const fs = require('fs');

http.createServer((req, res) => { // 创建HTTP服务器，用回调定义响应逻辑
    if (req.url == '/') {
        fs.readFile('./title.json', (err, data) => { // 读取JSON文件，用回调定义如何处理其中的内容
            if (err) { // 如果出错，输出错误日志，并给客户端返回 server error
                console.error(err);
                res.end('Server Error');
            } else {
                const titles = JSON.parse(data.toString()); // 从JSON文本中解析数据
                fs.readFile('./template.html', (err, data) => {// 读取HTML模板，在加载完成后是用回调
                    if (err) {
                        console.error(err);
                        res.end('Server Error');
                    } else {
                        const tmpl = data.toString();
                        const html = tmpl.replace('%', titles.join('</li><li>'));
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(html);
                    }
                });
            }
        });
    }
}).listen(8000, 'localhost');