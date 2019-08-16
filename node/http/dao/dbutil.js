//引用数据库模块
const mysql = require('mysql');

//解决连接被关闭无法访问连接   没次返回一个新的连接就可以了
function createConnection() {
    //创建连接
    const connection = mysql.createConnection({
        //地址
        host: '127.0.0.1',
        //端口
        port: '3306',
        //用户
        user: 'root',
        //密码
        password: '3060371LOVE',
        //连接那个数据库
        database: 'school'
    });
    return connection;
}
//
module.exports.createConnection = createConnection;

