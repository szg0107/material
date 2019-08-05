//引用Dao  当服务层逻辑极少时可用省略 直接在web层调用Dao
const blogDao = require('../dao/blogDao'),
    tagDao = require('../dao/tagDao'),
    tagBlogMappingDao = require('../dao/tagBlogMappingDao'),
    //接收web请求 将路径和方法相对应
    path = new Map(),
    //引用url组件
    url = require('url'),
    //引用获取当前时间工具
    timeUtil = require('../util/timeUtil'),
    //引用返回信息工具
    respUtil = require('../util/respUtil');

//分页查询博客
function queryBlogByPage(request, response) {
    const params = url.parse(request.url, true).query;
    //调用Dao层的方法
    blogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), (result) => {
        result.forEach((value) => {
            value.content = value.content.replace(/<img[\w\W]*>/, '');
            value.content = value.content.replace(/<[\w\W]{1,5}>/g, '');
            value.content = value.content.substring(0, 300);
            value.ctime = timeUtil.formatTime(value.ctime);
            value.link = `/blog_detail.html?blogId=${value.id}`;
        });
        respUtil.returnResult(response, result);
    });
}

//查询所有博客
function queryAllBlog(request, response) {
    //调用Dao层的方法
    blogDao.queryAllBlog((result) => {
        result.forEach((value) => {
            value.ctime = timeUtil.formatTime(value.ctime);
            value.link = `/blog_detail.html?blogId=${value.id}`;
        });
        respUtil.returnResult(response, result);
    });
}

//编辑博客
function editBlog(request, response) {
    const params = url.parse(request.url, true).query,
        //去掉标签中的空格和中文逗号
        tags = params.tags.replace(/ /g, '').replace('，', ',');
    request.on('data', (data) => {
        blogDao.insertBlog(params.title, data.toString().trim(), tags, 0, timeUtil.getNow(), timeUtil.getNow(), (res) => {
            respUtil.returnResult(response, null, '添加成功');
            //获取博客id
            const blogId = res.insertId,
                //将标签切割成数组
                tagList = Array.from(tags.split(','));
            //遍历标签数组
            tagList.forEach((value) => {
                if (value !== '') {
                    queryTag(value, blogId);
                }
            })
        });
    });
}

//查询博客总数
function queryBlogCount(request, response) {
    //调用Dao层的方法
    blogDao.queryBlogCount((result) => {
        respUtil.returnResult(response, result);
    });
}

//根据id查询博客
function queryBlogById(request, response) {
    const params = url.parse(request.url, true).query;
    //更新博客浏览数
    blogDao.addViews(parseInt(params.blogId), (result) => {
        //调用Dao层的方法
        blogDao.queryBlogById(parseInt(params.blogId), (result) => {
            result[0].ctime = timeUtil.formatTime(result[0].ctime);
            respUtil.returnResult(response, result);
        });
    });

}

//查询最近热门博客
function queryHotBlog(request, response) {
    blogDao.queryHotBlog(5, (result) => {
        result.forEach((value) => {
            value.ctime = timeUtil.formatTime(value.ctime);
            value.link = `/blog_detail.html?blogId=${value.id}`;
        });
        respUtil.returnResult(response, result);
    });
}


//根据标签名查标签
function queryTag(tag, blogId) {
    tagDao.queryTag(tag, (res) => {
        //没标签创建标签 有标签建立标签和博客的映射
        if (res === null || res.length === 0) {
            insertTag(tag, blogId);
        } else {
            insertTagBlogMapping(res[0].id, blogId);
        }
    });
}

//查询所有标签
function queryRandomTags(request, response) {
    tagDao.queryRandomTags((res) => {
        res.forEach((temp) => {
            temp.link = `/?tagId=${temp.id}`;
        });
        res.sort(() => {
            return Math.random() > 0.5;
        });
        respUtil.returnResult(response, res);
    });
}

//插入标签
function insertTag(tag, blogId) {
    //创建标签之后再建立标签和博客的映射
    tagDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), (res) => {
        insertTagBlogMapping(res.insertId, blogId);
    });
}


//插入映射表
function insertTagBlogMapping(tag_id, blog_id) {
    tagBlogMappingDao.insertTagBlogMapping(tag_id, blog_id, timeUtil.getNow(), timeUtil.getNow(), (res) => {
    });
}

//根据标签查博客
function queryBlogByTag(request, response) {
    request.on('data', (data) => {
        const params = JSON.parse(data.toString()),
            tempList = [];
        tagBlogMappingDao.queryBlogIdByTagId(params.tagId, params.page, params.pageSize, (result) => {
            // console.log(result);
            result.forEach((temp) => {
                blogDao.queryBlogById(parseInt(temp.blog_id), (result) => {
                    result[0].content = result[0].content.replace(/<img[\w\W]*>/, '');
                    result[0].content = result[0].content.replace(/<[\w\W]{1,5}>/g, '');
                    result[0].content = result[0].content.substring(0, 300);
                    result[0].link = `/blog_detail.html?blogId=${result[0].id}`;
                    result[0].ctime = timeUtil.formatTime(result[0].ctime);
                    tempList.push(result[0]);
                });
            });
            getResult(tempList, result.length, response);
        });
    });
}

//延时获取博客数组
function getResult(blogList, len, response) {
    if (blogList.length < len) {
        setTimeout(() => {
            getResult(blogList, len, response);
        }, 10);
    } else {
        // console.log(blogList);
        respUtil.returnResult(response, blogList);
    }
}

//根据标签查博客数量
function queryBlogByTagCount(request, response) {
    request.on('data', (data) => {
        const params = JSON.parse(data.toString());
        tagBlogMappingDao.queryBlogByTagCount(params.tagId, (result) => {
            // console.log(result);
            respUtil.returnResult(response, result);
        });
    });
}


path.set('/editBlog', editBlog);
path.set('/queryBlogByPage', queryBlogByPage);
path.set('/queryBlogCount', queryBlogCount);
path.set('/queryBlogById', queryBlogById);
path.set('/queryAllBlog', queryAllBlog);
path.set('/queryRandomTags', queryRandomTags);
path.set('/queryHotBlog', queryHotBlog);
path.set('/queryBlogByTag', queryBlogByTag);
path.set('/queryBlogByTagCount', queryBlogByTagCount);

//导出path
module.exports.path = path;
