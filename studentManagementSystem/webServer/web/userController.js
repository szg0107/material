//引用Dao  当服务层逻辑极少时可用省略 直接在web层调用Dao
const userDao = require('../dao/userDao'),
    //接收web请求 将路径和方法相对应
    path = new Map(),
    //引用获取当前时间工具
    timeUtil = require('../util/timeUtil'),
    //引用返回信息工具
    respUtil = require('../util/respUtil'),
    //生成验证码插件
    captcha = require('svg-captcha');

//添加用户
function addUser(request, response) {
    request.on('data', (data) => {
        // console.log(JSON.parse(data.toString()));
        const params = JSON.parse(data.toString());
        userDao.insertUser(params.userName, params.email, params.password, 1, timeUtil.getNow(), timeUtil.getNow(), (res) => {
            respUtil.returnResult(response, null, '添加成功');
        });
    });
}

//查询验证码
function queryRandomCode(request, response) {
    const img = captcha.create({fontSize: 50, width: 100, height: 50,});
    // console.log(img);
    //返回头
    response.writeHead(200, {'Content-Type': 'image/svg+xml'});
    //响应内容
    response.write(respUtil.writeResult('成功生成验证码', img));
    //关闭响应
    response.end()
}

//登录
function login(request, response) {
    request.on('data', (data) => {
        const params = JSON.parse(data.toString());
        userDao.queryUserByUserName(params.userName, (res) => {
            // console.log(res);
            if (res && res[0].pwd === params.password) {
                //写cookie
                // response.cookie('userName', res[0].user_name);
                // response.cookie('weight', res[0].weight);
                respUtil.returnResult(response, res, '登录成功');
            }else {
                //返回头
                response.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'});
                //响应内容
                response.write(respUtil.writeResult('用户不存在或密码错误', null,'error'));
                //关闭响应
                response.end();
            }
        });
    });
}

//查询所有用户
function queryAllUser(request, response) {
    userDao.queryAllUser( (res) => {
        // console.log(res);
        respUtil.returnResult(response, res);
    });
}



path.set('/addUser', addUser);
path.set('/queryRandomCode', queryRandomCode);
path.set('/login', login);
path.set('/queryAllUser', queryAllUser);

//导出path
module.exports.path = path;
