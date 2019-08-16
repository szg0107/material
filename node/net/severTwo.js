const net = require('net'),
    //file system 文件系统
    fs = require('fs'),
    //创建服务
    sever = net.createServer(),
    globalConf=require('./conf');


sever.listen(globalConf.port, '127.0.0.1');

sever.on('listening', () => {
    console.log('服务已启动');
});

sever.on('connection', (socket) => {
    socket.on('data', (data) => {
        const url = data.toString().split('\r\n')[0].split(' ')[1];
        //同步读取文件
        try {
            const dataFile = fs.readFileSync(globalConf['basePath']+url);
            // console.log(dataFile.toString());
            socket.write(`HTTP/1.1 200OK\r\n\r\n`);
            socket.write(dataFile)
        } catch (e) {
            socket.write('HTTP/1.1 404NotFound\r\n\r\n<html><body><h1>404 Not Found</h1></body></html>');
        }
        socket.end();
    });
});

