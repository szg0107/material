//写服务的 引入Dao
const studentDao=require('../dao/studentDao');
//定义方法 调用Dao 方法
function queryAllStudent(success) {
    studentDao.queryAllStudent(success);
}
function queryStudentByStuNum(stuNum,success){
    studentDao.queryStudentByStuNum(stuNum,success);
}
//web层调用service层，service层调dao层,dao层调数据库
module.exports={queryAllStudent,queryStudentByStuNum};
