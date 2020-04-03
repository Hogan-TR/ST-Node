const EventEmitter = require('events').EventEmitter;
const channel = new EventEmitter();
channel.on('join', () => { // 回调函数
    console.log('Welcome!');
});
channel.emit('join'); // 发射事件