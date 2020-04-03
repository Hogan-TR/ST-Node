const events = require('events');
const net = require('net');

const channel = new events.EventEmitter(); // 事件发射器
channel.setMaxListeners(50); // 避免监听器数量超过10个时发出警告
channel.clients = {};
channel.subscriptions = {};
channel.on('join', function (id, client) {
    const welcome = `
    Welcome!
    Guests online: ${this.listeners('broadcast').length}
    `;
    client.write(`${welcome}\n`);
    this.clients[id] = client; // 添加 join 事件的监听器，保存用户的 client 对象，以便程序可以将数据发送给用户
    this.subscriptions[id] = (senderId, message) => {
        if (id != senderId) { // 忽略发出这一广播数据的用户
            console.log(message);
            this.clients[id].write(message);
        }
    };
    this.on('broadcast', channel.subscriptions[id]); // 添加一个专门针对当前用户的 broadcast 事件监听器
});

channel.on('leave', function (id) { // 创建leave事件的监听器
    channel.removeListener(
        'broadcast', this.subscriptions[id]
    ); // 移除指定客户端的broadcast监听器
    channel.emit('broadcast', id, `${id} has left the chatroom.\n`); // 向其余用户发出广播
});

channel.on('shutdown', () => {
    channel.emit('broadcast', '', 'The server has shut down.\n');
    channel.removeAllListeners('broadcast');
})


const server = net.createServer(client => {
    const id = `${client.remoteAddress}:${client.remotePort}`;
    channel.emit('join', id, client);//当有用户连接到服务器上时发出一个join事件，指明用户ID和client对象
    client.on('data', data => {
        data = data.toString();
        if (data === '\r\n') {  // 敲回车 => shutdown
            channel.emit('shutdown');
        }
        channel.emit('broadcast', id, data); // 当有用户发送数据时，发出一个频道broadcast事件，指明用户ID和信息
    });
    client.on('close', () => {
        channel.emit('leave', id); // 当用户断开连接时发出leave事件
    })
});
server.listen(8888);

// 在function(){this}中this指向的是触发该事件的发射器实例对象
// 在箭头函数()=>{this}中this指向的则是myEmitter所在的父作用域对象