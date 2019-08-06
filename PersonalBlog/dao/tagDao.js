//一个Dao对应一个表的操作
const dbUtil = require('./dbUtil');

//根据标签名查询标签
function queryTag(tag, success) {
    const querySql = 'select * from tags where tag = ? ;',
        params = [tag];
    dbUtil.myConnect(querySql, params, success);
}

//查询所有标签
function queryRandomTags(success) {
    const querySql = 'select * from tags ;',
        params = [];
    dbUtil.myConnect(querySql, params, success);
}

//插入标签
function insertTag(tag, ctime, utime, success,) {
    const insertSql = 'insert into tags(tag, ctime, utime) values (?,?,?);',
        //多个参数用数组接收
        params = [tag, ctime, utime];
    dbUtil.myConnect(insertSql, params, success);
}

module.exports = {queryTag, queryRandomTags, insertTag};
