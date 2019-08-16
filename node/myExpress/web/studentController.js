//引用Dao  当服务层逻辑极少时可用省略 直接在web层调用Dao
const studentDao = require('../Dao/studentDao'),
    //接收web请求 将路径和方法相对应
    path = new Map(),
    //引用url组件
    url = require('url'),
    //引用文件组件
    fs = require('fs');

//查询所有学生
function queryAllStudent(request, response) {
    //调用Dao层的方法
    studentDao.queryAllStudent((result) => {
        //返回头
        response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        //响应内容
        response.write(JSON.stringify(result));
        //关闭响应
        response.end();

    });
}

//添加学生
function insertStudent(request, response) {
    const params = url.parse(request.url, true).query;
    studentDao.insertStudent(params.stuNum, params.name, params.age, params.stuClass, params.pwd, (res) => {
        //返回头
        response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        //响应内容
        response.write('添加成功');
        //关闭响应
        response.end();
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

path.set('/api/queryAllStudent', queryAllStudent);
path.set('/api/insertStudent', insertStudent);
path.set('/login', login);
//导出path
module.exports.path = path;
