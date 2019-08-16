const dbUtil = require('./dbutil');

//插入学生
function insertUserMsg(name, picPath, originName, picSize, success) {
    const insertSql = 'insert into user_msg(name,pic_path,origin_name,pic_size) values (?,?,?,?);',
        connection = dbUtil.createConnection(),
        //多个参数用数组接收
        params = [name, picPath, originName, picSize];
    //连接数据库
    connection.connect();
    //参数1：sql语句 参数2：回调方法(错误，回调信息)
    connection.query(insertSql, params, (error, result) => {
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

module.exports = {insertUserMsg};
