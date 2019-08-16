//过滤加载器 引用文件系统
const fs = require('fs'),
    //引全局设置
    globalConf = require('./config'),
    //读取目录
    files = fs.readdirSync(globalConf['filter_path']),
    //过滤器集合
    filterSet = [];
//遍历目录下所有文件
files.forEach((item) => {
    //引用每个文件
    const temp = require('./' + globalConf['filter_path'] + '/' + item);
    //添加到集合中
    filterSet.push(temp);
});
module.exports = filterSet;
