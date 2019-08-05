//引用Dao  当服务层逻辑极少时可用省略 直接在web层调用Dao
const commentDao = require('../dao/commentDao'),
    //接收web请求 将路径和方法相对应
    path = new Map(),
    //引用url组件
    url = require('url'),
    //引用获取当前时间工具
    timeUtil = require('../util/timeUtil'),
    //引用返回信息工具
    respUtil = require('../util/respUtil'),
    //生成验证码插件
    captcha = require('svg-captcha');

//添加留言
function addComment(request, response) {
    request.on('data', (data) => {
        // console.log(JSON.parse(data.toString()));
        const params = JSON.parse(data.toString());
        commentDao.insertComment(parseInt(params.blogId), parseInt(params.parent), params.parentName, params.userName, params.content, params.email, timeUtil.getNow(), timeUtil.getNow(), (res) => {
            respUtil.returnResult(response, null, '添加成功');
        });
    });
}

//查询验证码
function queryRandomCode(request, response) {
    const img = captcha.create({fontSize: 50, width: 100, height: 34});
    // console.log(img);
    //返回头
    response.writeHead(200, {'Content-Type': 'image/svg+xml'});
    //响应内容
    response.write(respUtil.writeResult('成功生成验证码', img));
    //关闭响应
    response.end()
}

//根据博客id查询留言
function queryCommentsByBlogId(request, response) {
    request.on('data', (data) => {
        // console.log(JSON.parse(data.toString()));
        const params = JSON.parse(data.toString());
        commentDao.queryCommentsByBlogId(parseInt(params.blogId), (res) => {
            res.forEach((temp) => {
                temp.ctime = timeUtil.formatTime(temp.ctime);
                if (temp.parent > -1) {
                    temp.options = `回复@${temp.parent_name}`;
                }
            });
            respUtil.returnResult(response, res);
        });
    });
}

//根据博客id查询留言数量
function queryCommentsCountByBlogId(request, response) {
    request.on('data', (data) => {
        // console.log(JSON.parse(data.toString()));
        const params = JSON.parse(data.toString());
        commentDao.queryCommentsCountByBlogId(parseInt(params.blogId), (res) => {
            respUtil.returnResult(response, res);
        });
    });
}

//查询最新评论
function queryNewComments(request, response) {
    // const params = JSON.parse(data.toString());
    commentDao.queryNewComments(5, (res) => {
        res.forEach((temp) => {
            temp.ctime = timeUtil.formatTime(temp.ctime);
        });
        respUtil.returnResult(response, res);
    });
}

path.set('/addComment', addComment);
path.set('/queryRandomCode', queryRandomCode);
path.set('/queryCommentsByBlogId', queryCommentsByBlogId);
path.set('/queryCommentsCountByBlogId', queryCommentsCountByBlogId);
path.set('/queryNewComments', queryNewComments);
//导出path
module.exports.path = path;
