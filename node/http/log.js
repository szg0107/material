//日志文件 引用文件系统
const fs = require('fs'),
    //引用全局配置
    globalConf = require('./config'),
    //文件名
    fileName = globalConf['log_path'] + globalConf['log_name'];

//异步写文件
// fs.writeFileSync(fileName,'asd');
function log(data) {
//同步写文件 已追加的模式打开 文件不存在则创建文件
//     fs.writeFile(fileName,data+'\n',{flag:'a'},()=>{});
    //追加文件
    fs.appendFile(fileName, data + '\n', () => {});
}

module.exports = log;
