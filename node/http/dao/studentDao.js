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

//根据班级和年龄查询学生
function queryStudentByClassAndAge(classNum, age, success) {
    //防止sql注入 参数用？代替 将参数放到sql语句和回调函数之间
    let querySql = 'select * from student where class = ? and age = ?;',
        //多个参数用数组接收
        queryParams = [classNum, age],
        connection = dbUtil.createConnection();
    //连接数据库
    connection.connect();
    //参数1：sql语句 参数2：回调方法(错误，回调信息)
    connection.query(querySql, queryParams, (error, result) => {
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

//根据学号查询学生
function queryStudentByStuNum(stuNum, success) {
    let querySql = 'select * from student where stu_num = ? ;',
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

module.exports = {queryAllStudent, queryStudentByClassAndAge, queryStudentByStuNum};
