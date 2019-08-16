//接收web请求 将路径和方法相对应
const path = new Map(),
    //引用服务层
    studentService = require('../service/studentService'),
    url = require('url');

//获取数据
function getData(request, response) {
    //返回头
    response.writeHead(200);
    //调用服务层的方法
    studentService.queryAllStudent((result) => {
        const resArr = [];
        //遍历数据
        result.forEach((item) => {
            //将数据的名字添加到数组中
            resArr.push(item.name);
        });
        //响应内容
        response.write(resArr.toString());
        //关闭响应
        response.end();
    });
}
//登录
function login(request, response) {
    //ge请求时获取参数
    // const params = url.parse(request.url, true).query;
    let res = '';
    //post获取参数
    request.on('data', (data) => {
        const stuNum = data.toString().split('&')[0].split('=')[1],
            password = data.toString().split('&')[1].split('=')[1];
        studentService.queryStudentByStuNum(stuNum, (result) => {
            if (result) {
                if (result[0].pwd === password) {
                    res = 'ok';
                    //写入cookie
                    response.writeHead(200,{'Set-cookie':`id=${result[0].id}`});
                } else {
                    res = 'fail';
                }
            } else {
                res = 'fail';
            }
            response.write(res);
            response.end();
            //前端用form表单请求接口时,后端用重定向实现页面跳转 并设置cookie
            // response.writeHead(302,{'location':'/main.html','Set-cookie':`id=${result[0].id}`});
            // response.end();
        });
    });

}

path.set('/getData', getData);
path.set('/login', login);
//导出path
module.exports.path = path;
