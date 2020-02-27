const mySql = require('mysql');
//创建一个连接
function createConnection() {
    const connection = mySql.createConnection({
        //地址
        host: '192.168.43.47',
        //端口
        port: '3306',
        //用户
        user: 'root',
        //密码
        password: '3060371LOVE',
        //连接那个数据库
        database: 'my_blog'
    });
    return connection;
}

//连接数据执行SQL
function myConnect(sql, params, success) {
    const connection = createConnection();
    //连接数据库
    connection.connect();
    //参数1：sql语句 参数2：回调方法(错误，回调信息)
    connection.query(sql, params, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            // console.log(result);
            success(result);
        }
    });
    //关闭连接
    connection.end();
}

module.exports = {createConnection, myConnect};
