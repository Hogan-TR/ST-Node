const redis = require('redis');
const db = redis.createClient();

class Entry {
    constructor(obj) {
        for (let key in obj) { // 循环遍历传入对象中的键
            this[key] = obj[key]; // 合并值
        }
    }

    save(cb) {
        const entryJSON = JSON.stringify(this); // 将保存的消息转换成JSON字符串
        db.lpush(
            'entries',
            entryJSON, // 将JSON字符串保存到Redis列表中
            (err) => {
                if (err) return cb(err);
                cb();
            }
        );
    }

    static getRange(from, to, cb) {
        db.lrange('entries', from, to, (err, items) => { // 获取消息记录
            if (err) return cb(err);
            let entries = [];
            items.forEach((item) => {
                entries.push(JSON.parse(item)); // 解码之前保存为JSON的消息记录
            });
            cb(null, entries);
        })
    }
}

module.exports = Entry;