//一个Dao对应一个表的操作
const dbUtil = require('./dbUtil');

//分页查询所有学生
function queryStudentByPage(page, pageSize, success) {
    const querySql = 'select * from students order by id desc limit ?,?;',
        params = [page * pageSize, pageSize];
    dbUtil.myConnect(querySql, params, success);
}

//查询学生总数
function queryStudentCount(success) {
    const querySql = 'select count(1) as count from students ;',
        params = [];
    dbUtil.myConnect(querySql, params, success);
}

//根据关键字模糊查询学生
function queryStudentByKeyWord(keyWord, page, pageSize, success) {
    const deleteSql = 'select *  from students  where locate(?, name)>0  order by id desc limit ?,? ;',
        params = [keyWord, page, pageSize];
    dbUtil.myConnect(deleteSql, params, success);
}

//添加学生
function insertStudent(sNo, name, email, sex, birth, phone, address, user_id, ctime, utime, success) {
    const insertSql = 'insert into students (sNo, name, email, sex, birth, phone, address, user_id, ctime, utime) values (?,?,?,?,?,?,?,?,?,?) ;',
        //多个参数用数组接收
        params = [sNo, name, email, sex, birth, phone, address, user_id, ctime, utime];
    dbUtil.myConnect(insertSql, params, success);
}

//根据id删除学生
function deleteStudentById(id, success) {
    const deleteSql = 'delete  from students  where id = ? ;',
        params = [id];
    dbUtil.myConnect(deleteSql, params, success);
}

//根据id修改学生信息
function updateStudentById(name, email, sex, birth, phone, address, utime, id, success) {
    const updateSql = 'update students set  name = ?, email = ?, sex = ?, birth = ?, phone = ?, address = ?, utime = ? where id = ? ;',
        params = [name, email, sex, birth, phone, address, utime, id,];
    dbUtil.myConnect(updateSql, params, success);
}


//根据用户id分页查询学生
function queryStudentByUserId(user_id, page, pageSize, success) {
    const querySql = 'select * from students where user_id = ? order by id desc limit ?,? ;',
        params = [user_id, page * pageSize, pageSize];
    dbUtil.myConnect(querySql, params, success);
}

//根据用户id查询学生总数
function queryStudentCountByUserId(user_id, success) {
    const querySql = 'select count(1) as count from students  where user_id = ? ;',
        params = [user_id];
    dbUtil.myConnect(querySql, params, success);
}

//根据用户id和关键字模糊查询学生
function queryStudentByKeyWordAndUserId(user_id, keyWord, page, pageSize, success) {
    const deleteSql = 'select *  from students  where user_id = ? and locate(?, name)>0 order by id desc limit ?,? ;',
        params = [user_id, keyWord, page, pageSize];
    dbUtil.myConnect(deleteSql, params, success);
}


module.exports =
    {
        queryStudentByPage,
        insertStudent,
        queryStudentByKeyWord,
        queryStudentCount,
        updateStudentById,
        deleteStudentById,

        queryStudentByUserId,
        queryStudentCountByUserId,
        queryStudentByKeyWordAndUserId
    };
