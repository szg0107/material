//一个Dao对应一个表的操作
const dbUtil = require('./dbUtil');

//根据博客id查询查询留言
function queryCommentsByBlogId(blog_id, success) {
    const querySql = 'select * from comments where blog_id = ?;',
        params = [blog_id];
    dbUtil.myConnect(querySql, params, success);
}

//根据博客id查询留言数量
function queryCommentsCountByBlogId(blog_id, success) {
    const querySql = 'select count(1) as total from comments where blog_id = ?;',
        params = [blog_id];
    dbUtil.myConnect(querySql, params, success);
}

//查询最新评论
function queryNewComments(size, success) {
    const querySql = 'select * from comments order by id desc limit ?;',
        params = [size];
    dbUtil.myConnect(querySql, params, success);
}

//插入留言
function insertComment(blog_id, parent, parent_name, user_name, comments, email, ctime, utime, success) {
    const insertSql = 'insert into comments(blog_id, parent, parent_name, user_name, comments, email, ctime, utime) values (?,?,?,?,?,?,?,?);',
        //多个参数用数组接收
        params = [blog_id, parent, parent_name, user_name, comments, email, ctime, utime];
    dbUtil.myConnect(insertSql, params, success);
}


module.exports = {queryCommentsByBlogId, queryCommentsCountByBlogId, queryNewComments, insertComment};
