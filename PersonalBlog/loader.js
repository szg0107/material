//加载器 引用文件系统
const fs = require('fs'),
    //引用全局配置
    globalConf = require('./config'),
    //读取目录 读取路径下所有的东西
    files = fs.readdirSync(globalConf['web_path']),
    //控制器集合
    controllerSet = [],
    //全局映射
    pathMap = new Map();

//传入app然后设置get或post方法
function init(app){
    //遍历文件夹中的每一项
    files.forEach((item) => {
        // console.log(globalConf['web_path'] + '/' + item);
        //引用目录下的每一项
        const temp = require(`./${globalConf['web_path']}/${item}`);
        if (temp.path) {
            //遍历path
            temp.path.forEach((value, key) => {
                // console.log(key);
                // console.log(value);
                //key不存在就添加
                if (!pathMap.get(key)) {
                    pathMap.set(key, value);
                    app.get(key,value);
                    app.post(key,value);
                } else {
                    throw new Error(`url path异常，url：${key}`);
                }
                controllerSet.push(temp);
            });
        }
    });
}
// console.log(controllerSet); 导出全局映射
module.exports.init = init;
