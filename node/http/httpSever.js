//网络请求组件 引用系统模块直接引用，引用自己的模块需要加上相对路径
const http = require('http'),
    //解析地址组件
    url = require('url'),
    //配置文件
    globalConf = require('./config'),
    //文件系统
    fs = require('fs'),
    //全局映射
    loader = require('./loader'),
    //日志
    log = require('./log'),
    //过滤器
    filterSet = require('./fiterLoader');

//创建服务 http底层是net 解析好的request
http.createServer((request, response) => {
    //地址 用url插件解析url获取地址
    const pathName = url.parse(request.url).pathname,
        //参数  用url插件解析url获取参数 第二个参数:将参数转换为对象
        params = url.parse(request.url, true).query,
        //是否是静态文件
        isStatic = isStaticsRequest(pathName);
    //循环遍历过滤器并执行对应方法全部通过才能往下走
    for (let i = 0; i < filterSet.length; i++) {
        const flag = filterSet[i](request, response);
        if (!flag) {
            return;
        }
    }
    if (isStatic) {
        try {
            //静态文件
            const data = fs.readFileSync(globalConf['page_path'] + pathName);
            //响应头
            response.writeHead(200);
            //响应内容
            response.write(data);
        } catch (e) {
            console.log(e);
            response.writeHead(404);
            response.write('<html><body><h1>404 Not Found</h1></body></html>');
        }
        //关闭响应
        response.end();
    } else {
        //动态数据
        console.log('请求动态数据');
        //有映射方法
        if (loader.get(pathName)) {
            try {
                //直接执行方法
                loader.get(pathName)(request, response);
            } catch (e) {
                //服务器端错误
                response.writeHead(500);
                response.write('<html><body><h1>500 Bad Server</h1></body></html>');
                response.end();
            }

        } else {
            response.writeHead(404);
            response.write('<html><body><h1>404 Not Found</h1></body></html>');
            response.end();
        }
    }
//监听端口
}).listen(globalConf['port']);

log('服务已启动');

//判断请求是静态文件还是动态数据
function isStaticsRequest(pathName) {
    //遍历静态文件类型
    for (let i = 0; i < globalConf.static_file_type.length; i++) {
        //拿到静态文件类型数组的每一项
        const temp = globalConf.static_file_type[i];
        //文件是否存在，文件后缀出现的位置等于文件名长度-类型长度
        if (pathName.indexOf(temp) === pathName.length - temp.length) {
            return true;
        }
    }
    return false;
}
