//一个Dao对应一个表的操作
const dbUtil = require('./dbUtil');

//分页查询博客
function queryUserByPage(page, pageSize, success) {
    const querySql = 'select * from blog order by id desc limit ?,?;',
        params = [page * pageSize, pageSize];
    dbUtil.myConnect(querySql, params, success);
}

//查询所有用户
function queryAllUser(success) {
    const querySql = 'select * from user order by id desc ;',
        params = [];
    dbUtil.myConnect(querySql, params, success);
}

//添加用户
function insertUser(user_name, email, pwd, weight, ctime, utime, success) {
    const insertSql = 'insert into user(user_name, email, pwd, weight, ctime, utime) values (?,?,?,?,?,?);',
        //多个参数用数组接收
        params = [user_name, email, pwd, weight, ctime, utime];
    dbUtil.myConnect(insertSql, params, success);
}


//根据用户名查用户
function queryUserByUserName(user_name, success) {
    const querySql = 'select * from user where user_name = ? ;',
        params = [user_name];
    dbUtil.myConnect(querySql, params, success);
}


module.exports =
    {
        queryUserByPage,
        queryAllUser,
        insertUser,
        queryUserByUserName,
    };
