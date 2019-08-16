
//加载配置文件
const fs=require('fs'),
    conf = fs.readFileSync('./net/sever.conf').toString().split('\r\n'),
    globalConf = {};
for (let i = 0; i < conf.length; i++) {
    let tempConf = conf[i].split('=');
    if (tempConf.length < 2) {
        continue;
    } else {
        globalConf[tempConf[0]] = tempConf[1];
    }

}
globalConf.basePath=globalConf['path_position']==='relative'?__dirname+globalConf.path:globalConf.path;
console.log(globalConf);

module.exports=globalConf;
