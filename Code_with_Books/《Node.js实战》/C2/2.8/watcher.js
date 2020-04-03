const fs = require('fs');
const events = require('events');

class Watcher extends events.EventEmitter { // 扩展 EventEmitter 添加处理文件的方法
    constructor(watchDir, processedDir) {
        super();
        this.watchDir = watchDir;
        this.processedDir = processedDir;
    }

    watch() {
        fs.readdir(this.watchDir, (err, files) => { // 处理 watch 目录的所有文件
            if (err) throw err;
            for (var index in files) {
                this.emit('process', files[index]);
            }
        })
    }

    start() { // 添加开始监控的方法
        fs.watchFile(this.watchDir, () => { // watchFile 当被监控目录中发生改变时
            this.watch();
        })
    }
}

// module.exports = Watcher;

const watcher = new Watcher('E:/Coding/JavaScript/learning/Chapter Two/2.8', 'E:/Coding/JavaScript/learning/Chapter Two/2.8'); // 新建对象
watcher.on('process', function (file) {
    const watchFile = `${this.watchDir}/${file}`;
    const processedFile = `${this.processedDir}/${file.toLowerCase()}`;
    fs.rename(watchFile, processedFile, err => {
        if (err) throw err;
    });
});
watcher.start();