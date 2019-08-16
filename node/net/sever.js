const net = require('net'),
    //创建服务
    sever = net.createServer();
//监听地址及端口
sever.listen(12306, '127.0.0.1');

//是否监听端口事件
sever.on('listening', () => {
    console.log('服务已启动');
});

//连接事件
sever.on('connection', (socket) => {
    console.log('有新的连接');
    //是否有数据
    socket.on('data',(data)=>{
        console.log(data.toString());
        socket.write('hello,client');
    });
});
