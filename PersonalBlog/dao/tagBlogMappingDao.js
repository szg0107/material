//一个Dao对应一个表的操作
const dbUtil = require('./dbutil');

//通过标签id查询博客id
function queryBlogIdByTagId(tagId, page, pageSize, success) {
    const querySql = 'select * from tag_blog_mapping where tag_id = ? limit ?, ?;',
        params = [tagId, page * pageSize, pageSize];
    dbUtil.myConnect(querySql, params, success);
}

//通过标签id查询博客条数
function queryBlogByTagCount(tagId, success) {
    const querySql = 'select count(1) as count from tag_blog_mapping where tag_id = ? ;',
        params = [tagId];
    dbUtil.myConnect(querySql, params, success);
}

//插入映射关系
function insertTagBlogMapping(tag_id, blog_id, ctime, utime, success) {
    const insertSql = 'insert into tag_blog_mapping(tag_id, blog_id, ctime, utime) values (?,?,?,?);',
        //多个参数用数组接收
        params = [tag_id, blog_id, ctime, utime];
    dbUtil.myConnect(insertSql, params, success);
}

module.exports = {insertTagBlogMapping, queryBlogIdByTagId, queryBlogByTagCount};
