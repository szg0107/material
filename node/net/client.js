// 引用net模块
const net = require('net'),
    //createConnection和connect都是创建连接，createConnection底层用的是connect,所以直接用connect。
    socket = net.connect(12306, '127.0.0.1');
//客户端连接事件
socket.on('connect', () => {
    console.log('客户端已连接到服务器');
    console.log(socket.remoteAddress,socket.remotePort,socket.localAddress,socket.localPort);
});
//往服务端发送消息
socket.write('hello,sever');

//是否有数据
socket.on('data', (data) => {
    console.log(data.toString());
    socket.end();
});
//客户端关闭事件
socket.on('end', () => {
    console.log('客户端关闭');
});
