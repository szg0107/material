//一个Dao对应一个表的操作
const dbUtil = require('./dbutil');

//查询全部学生
function queryAllStudent(success) {
    const querySql = 'select * from student;',
        connection = dbUtil.createConnection();
    //连接数据库
    connection.connect();
    //参数1：sql语句 参数2：回调方法(错误，回调信息)
    connection.query(querySql, (error, result) => {
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

//插入学生
function insertStudent(stuNum, name, age, stuClass, pwd, success) {
    const insertSql = 'insert into student(stu_num,name,age,class,pwd) values (?,?,?,?,?);',
        connection = dbUtil.createConnection(),
        //多个参数用数组接收
        params = [stuNum, name, age, stuClass, pwd];
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

//根据学号查询学生
function queryStudentByStuNum(stuNum, success) {
    const querySql = 'select * from student where stu_num = ? ;',
        connection = dbUtil.createConnection();
    //连接数据库
    connection.connect();
    //参数1：sql语句 参数2：回调方法(错误，回调信息)
    connection.query(querySql, stuNum, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            console.log(result);
            success(result);
        }
    });
//关闭连接
    connection.end();
}

module.exports = {queryAllStudent, insertStudent, queryStudentByStuNum};
