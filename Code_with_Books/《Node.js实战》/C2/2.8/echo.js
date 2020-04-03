const net = require('net');
const server = net.createServer(socket => {
    socket.once('data', data => { // 当读取到新数据时处理的data事件
        console.log(data);
        socket.write(data); // 数据被写回到客户端
    });
});
server.listen(8888);