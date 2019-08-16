//引用Dao  当服务层逻辑极少时可用省略 直接在web层调用Dao
const studentDao = require('../dao/studentsDao'),
    //接收web请求 将路径和方法相对应
    path = new Map(),
    //引用获取当前时间工具
    timeUtil = require('../util/timeUtil'),
    //引用返回信息工具
    respUtil = require('../util/respUtil');

//查询所有学生总数
function queryStudentCount(request, response) {
    studentDao.queryStudentCount((res) => {
        // console.log(res);
        respUtil.returnResult(response, res);
    });
}

//分页查询所有学生
function queryStudentByPage(request, response) {
    request.on('data', (data) => {
        // console.log(JSON.parse(data.toString()));
        const params = JSON.parse(data.toString());
        studentDao.queryStudentByPage(params.page, params.pageSize, (res) => {
            // console.log(res);
            respUtil.returnResult(response, res);
        });
    });
}

//根据关键字查询学生
function queryStudentByKeyWord(request, response) {
    request.on('data', (data) => {
        // console.log(JSON.parse(data.toString()));
        const params = JSON.parse(data.toString());
        studentDao.queryStudentByKeyWord(params.keyWord, params.page, params.pageSize, (res) => {
            // console.log(res);
            respUtil.returnResult(response, res);
        });
    });
}

//添加学生
function insertStudent(request, response) {
    request.on('data', (data) => {
        // console.log(JSON.parse(data.toString()));
        const params = JSON.parse(data.toString());
        studentDao.insertStudent(params.sNo, params.name, params.email, params.sex, params.birth, params.phone, params.address, params.user_id, timeUtil.getNow(), timeUtil.getNow(), (res) => {
            // console.log(res);
            respUtil.returnResult(response, null, '添加成功');
        });
    });
}

//修改学生
function updateStudentById(request, response) {
    request.on('data', (data) => {
        // console.log(JSON.parse(data.toString()));
        const params = JSON.parse(data.toString());
        studentDao.updateStudentById(params.name, params.email, params.sex, params.birth, params.phone, params.address, timeUtil.getNow(), params.id, (res) => {
            // console.log(res);
            respUtil.returnResult(response, null, '修改成功');
        });
    });
}

//删除学生
function deleteStudentById(request, response) {
    request.on('data', (data) => {
        // console.log(JSON.parse(data.toString()));
        const params = JSON.parse(data.toString());
        studentDao.deleteStudentById(params.id, (res) => {
            // console.log(res);
            respUtil.returnResult(response, null, '删除成功');
        });
    });
}


//根据用户id分页查询学生
function queryStudentByUserId(request, response) {
    request.on('data', (data) => {
        // console.log(JSON.parse(data.toString()));
        const params = JSON.parse(data.toString());
        studentDao.queryStudentByUserId(params.id, params.page, params.pageSize, (res) => {
            // console.log(res);
            respUtil.returnResult(response, res);
        });
    });
}

//根据用户id查询学生总数
function queryStudentCountByUserId(request, response) {
    request.on('data', (data) => {
        // console.log(JSON.parse(data.toString()));
        const params = JSON.parse(data.toString());
        studentDao.queryStudentCountByUserId(params.id, (res) => {
            // console.log(res);
            respUtil.returnResult(response, res);
        });
    });
}

//根据用户id和关键字模糊查询学生
function queryStudentByKeyWordAndUserId(request, response) {
    request.on('data', (data) => {
        // console.log(JSON.parse(data.toString()));
        const params = JSON.parse(data.toString());
        studentDao.queryStudentByKeyWordAndUserId(params.id, params.keyWord, params.page, params.pageSize, (res) => {
            // console.log(res);
            respUtil.returnResult(response, res);
        });
    });
}

path.set('/queryStudentCount', queryStudentCount);
path.set('/queryStudentByPage', queryStudentByPage);
path.set('/queryStudentByKeyWord', queryStudentByKeyWord);

path.set('/insertStudent', insertStudent);
path.set('/updateStudentById', updateStudentById);
path.set('/deleteStudentById', deleteStudentById);

path.set('/queryStudentByUserId', queryStudentByUserId);
path.set('/queryStudentCountByUserId', queryStudentCountByUserId);
path.set('/queryStudentByKeyWordAndUserId', queryStudentByKeyWordAndUserId);
//导出path
module.exports.path = path;
