//引用express
const express = require('express'),
    //创建对象
    app = new express(),
    //全局映射
    loader = require('./loader');
/* 跨域设置 */
app.all('*', function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    //允许的header类型
    res.header('Access-Control-Allow-Headers', 'content-type');
    //是否允许后续请求携带认证信息（cookies）,该值只能是true,否则不返回
    res.header('Access-Control-Allow-Credentials', 'true');
    //跨域允许的请求方式
    res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
    if (req.method.toLowerCase() === 'options') {
        res.send(200); //让options尝试请求快速结束
    } else {
        next();
    }
});


//初始化映射
loader.init(app);

//监听端口
app.listen(80, () => {
    console.log('服务已启动');
});


