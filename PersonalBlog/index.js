//引用express
const express = require('express'),
    //创建app对象
    app = new express(),
    //全局配置
    globalConf = require('./config'),
    //全局映射
    loader = require('./loader');
//指定静态文件路径 默认访问index.html
app.use(express.static(globalConf['page_path']));
//初始化映射
loader.init(app);
//监听端口
app.listen(globalConf['port'],()=>{
    console.log('服务已启动');
});
