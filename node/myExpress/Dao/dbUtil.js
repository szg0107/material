const mySql=require('mysql');
function createConnection() {
    const connection=mySql.createConnection({
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
module.exports.createConnection=createConnection;
