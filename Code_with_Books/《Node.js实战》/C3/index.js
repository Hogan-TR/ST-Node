const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Article = require('./db').Article; // 加载数据库模块
const read = require('node-readability');


app.set('port', process.env.PORT || 3000);

// 中间件
app.use(bodyParser.json()); // 支持编码为 JSON 的请求消息体
app.use(bodyParser.urlencoded({ extended: true })); // 支持编码为表单的请求消息体
app.use('/css/bootstrap.css', // 用 express.static 将文件注册到恰当的 url
    express.static('node_modules/bootstrap/dist/css/bootstrap.css'));


app.get('/articles', (req, res, next) => { // 获取所有文章
    Article.all((err, articles) => {
        if (err) return next(err);
        res.format({ // 根据请求发送相应格式
            html: () => {
                res.render('articles.ejs', { articles: articles });
            },
            json: () => {
                res.send(articles);
            }
        })
    });
});

app.post('/articles', (req, res, next) => { // 创建一篇文章
    const url = req.body.url;

    read(url, (err, result) => {
        if (err || !result) res.status(500).send('Error downloading article');
        Article.create({ title: result.title, content: result.content },
            (err, article) => {
                if (err) return next(err);
                res.send('OK'); // 文章保存成功，发送状态码为200的响应
            });
    });
});

app.get('/articles/:id', (req, res, next) => { // 获取指定文章
    const id = req.params.id;
    Article.find(id, (err, article) => {
        if (err) return next(err);
        res.send(article);
    })
    //console.log('Fetching:', id);
});

app.delete('/articles/:id', (req, res, next) => { // 删除指定文章
    const id = req.params.id;
    Article.delete(id, (err) => {
        if (err) return next(err);
        res.send({ message: 'Deleted' });
    });
    //console.log('Deleting:', id);
});


app.listen(app.get('port'), () => {
    console.log('App started on port', app.get('port'));
});

module.exports = app;


// const read = require('node-readability');
// const url = 'http://www.chinadaily.com.cn/a/202002/28/WS5e58d92ba31012821727b25c.html';
// read(url, (err, res) => {
//     Article.create(
//         { title: res.title, content: res.content },
//         (err, article) => {
//             console.log(article);
//         }
//     );
// });