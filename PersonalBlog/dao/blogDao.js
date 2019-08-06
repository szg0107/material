//一个Dao对应一个表的操作
const dbUtil = require('./dbUtil');

//分页查询博客
function queryBlogByPage(page, pageSize, success) {
    const querySql = 'select * from blog order by id desc limit ?,?;',
        params = [page * pageSize, pageSize];
    dbUtil.myConnect(querySql, params, success);
}

//查询所有博客
function queryAllBlog(success) {
    const querySql = 'select * from blog order by id desc ;',
        params = [];
    dbUtil.myConnect(querySql, params, success);
}

//编辑博客
function insertBlog(title, content, tags, views, ctime, utime, success) {
    const insertSql = 'insert into blog(title,content,tags,views,ctime,utime) values (?,?,?,?,?,?);',
        //多个参数用数组接收
        params = [title, content, tags, views, ctime, utime];
    dbUtil.myConnect(insertSql, params, success);
}

//更新浏览数
function addViews(id, success) {
    const updateSql = 'update blog set views = views + 1 where id = ?;',
        //多个参数用数组接收
        params = [id];
    dbUtil.myConnect(updateSql, params, success);
}

//查询博客总数
function queryBlogCount(success) {
    const querySql = 'select count(1) as count from blog ;',
        params = [];
    dbUtil.myConnect(querySql, params, success);
}

//根据id查询博客
function queryBlogById(blogId, success) {
    const querySql = 'select * from blog where id = ? ;',
        params = [blogId];
    dbUtil.myConnect(querySql, params, success);
}

//查询最近热门博客
function queryHotBlog(size, success) {
    const querySql = 'select * from blog order by views desc limit ? ;',
        params = [size];
    dbUtil.myConnect(querySql, params, success);
}

module.exports =
    {
        queryBlogByPage,
        queryBlogCount,
        queryBlogById,
        queryAllBlog,
        insertBlog,
        addViews,
        queryHotBlog
    };
