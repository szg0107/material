//引用Dao  当服务层逻辑极少时可用省略 直接在web层调用Dao
const everyDayDao = require('../dao/everyDayDao'),
    //接收web请求 将路径和方法相对应
    path = new Map(),
    //引用url组件
    url = require('url'),
    //引用文件组件
    fs = require('fs'),
    //引用获取当前时间工具
    timeUtil = require('../util/timeUtil'),
    //引用返回信息工具
    respUtil = require('../util/respUtil');

//查询所有每日一句
function queryEveryDay(request, response) {
    //调用Dao层的方法
    everyDayDao.queryEveryDay((result) => {
        respUtil.returnResult(response, result);
    });
}

//编辑每日一句
function editEveryDay(request, response) {
    request.on('data', (data) => {
        everyDayDao.editEveryDay(data.toString().trim(), timeUtil.getNow(), (res) => {
            respUtil.returnResult(response, null, '添加成功');
        });
    });
}

//登录
function login(request, response) {
    const params = url.parse(request.url, true).query;
    studentDao.queryStudentByStuNum(params.stuNum, (res) => {
        if (res && res[0].pwd === params.pwd) {
            //写cookie
            response.cookie('id', res[0].id);
            //重定向
            response.redirect('/api/queryAllStudent');
        } else {
            response.redirect('/a.html');
        }
    });
}

//获得图片
function getPic(request, response) {
    const params = url.parse(request.url, true).query;
    try {
        const data = fs.readFileSync(`./${params.path}`);
        response.writeHead(200);
        response.write(data);
    } catch (e) {
        response.writeHead(404);
    }
    response.end();
}

path.set('/editEveryDay', editEveryDay);
path.set('/queryEveryDay', queryEveryDay);
//导出path
module.exports.path = path;
