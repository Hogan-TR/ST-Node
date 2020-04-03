const sqlite3 = require('sqlite3').verbose();
const dbName = 'later.sqlite';
const db = new sqlite3.Database(dbName); // 连接到一个数据库文件

db.serialize(() => {
    const sql = `
    CREATE TABLE IF NOT EXISTS articles
    (id integer primary key, title, content TEXT)
    `;
    db.run(sql); // 如果没有，创建一个 aritcles 表
});

class Article {
    static all(cb) {
        db.all('SELECT * FROM articles', cb); // 获取所有文章
    }

    static find(id, cb) {
        db.get('SELECT * FROM articles WHERE id = ?', id, cb); // 选择一篇指定的文章
    }

    static create(data, cb) {
        const sql = 'INSERT INTO articles(title, content) VALUES (?, ?)';
        db.run(sql, data.title, data.content, cb); // 问号表示参数
    }

    static delete(id, cb) {
        if (!id) return cb(new Error('Please provide an id'));
        db.run('DELETE FROM articles WHERE id = ?', id, cb);
    }
}

module.exports = db;
module.exports.Article = Article;