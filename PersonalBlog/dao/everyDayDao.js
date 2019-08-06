//一个Dao对应一个表的操作
const dbUtil = require('./dbUtil');

//查询每日一句
function queryEveryDay(success) {
    const querySql = 'select * from every_day order by id desc limit 1;',
        params = [];
    dbUtil.myConnect(querySql, params, success);
}

//编辑每日一句
function editEveryDay(content, ctime, success) {
    const insertSql = 'insert into every_day(content,ctime) values (?,?);',
        //多个参数用数组接收
        params = [content, ctime];
    dbUtil.myConnect(insertSql, params, success);
}

module.exports = {queryEveryDay, editEveryDay};
