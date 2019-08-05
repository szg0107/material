//解析配置文件 引用读写文件插件
const fs = require('fs'),
    //读取sever.conf文件按照回车切割
    conf = fs.readFileSync('./server.conf').toString().split('\n'),
    //全局配置对象
    globalConf = {};
//将conf数组的值按等号切割，给globalConf对象赋属性和值
for (let i = 0; i < conf.length; i++) {
    let tempConf = conf[i].split('=');
    if (tempConf.length < 2) {
        continue;
    } else {
        globalConf[tempConf[0]] = tempConf[1].trim();
    }
}
console.log(globalConf);
//判断静态文件类型是否存在
/*if (globalConf['static_file_type']) {
    //将静态文件类型字符串转换为数组
    globalConf['static_file_type'] = globalConf['static_file_type'].split('|');
} else {
    throw  new Error('配置文件异常，缺少static_file_type');
}*/
//导出全局配置对象
module.exports = globalConf;
