//登录过滤器 解析地址组件
const url = require('url'),
    //配置文件
    globalConf = require('../config');
//登录过滤
function loginFilter(request, response) {
    //获取地址
    const pathName = url.parse(request.url).pathname;

    //等于index页面和登录接口或者是静态文件时放行
    if (pathName === '/index.html' || pathName === '/login' || isStaticsRequest(pathName)) {
        console.log(pathName + '放行');
        return true;
    } else if (request.headers.cookie) {
        //如果存在cookie 以分号切割cookie
        const cookies = request.headers.cookie.split(';');
        //遍历cookies数组 以等号切割并且去空格 看有没有id
        for (let i = 0; i < cookies.length; i++) {
            if (cookies[i].split('=')[0].trim() === 'id') {
                return true;
            }
        }
    } else {
        console.log(pathName + '拦截');
        //重定向到index页面
        response.writeHead(302, {'location': './index.html'});
        response.end();
        return false;
    }
}

//判断请求是静态文件还是动态数据
function isStaticsRequest(pathName) {
    for (let i = 0; i < globalConf.static_file_type.length; i++) {
        const temp = globalConf.static_file_type[i];
        //将html忽略
        if (temp === '.html') {
            continue;
        }
        if (pathName.indexOf(temp) === pathName.length - temp.length) {
            return true;
        }
    }
    return false;
}

module.exports = loginFilter;
