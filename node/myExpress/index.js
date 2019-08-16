//引入express
const myExpress = require('express'),
    //创建app对象
    app = new myExpress(),
    //全局配置
    globalConf = require('./config'),
    //全局映射
    loader = require('./loader'),
    //引用cookie工具包
    cookie = require('cookie-parser'),
    //上传文件插件
    multer = require('multer'),
    //上传文件配置 multer初始化
    uploadSingle = multer({
        //上传文件保存到哪个目录下
        dest: './file',
    }),
    //引用userMsgDao
    userMsgDao = require('./Dao/userMsgDao');
//指定静态文件路径 默认访问index.html
app.use(myExpress.static(globalConf['page_path']));

//转义cookie
app.use(cookie());


//express拦截器 next 如果通过拦截就执行该执行的方法
app.get('/api/*', (request, response, next) => {
    if (request.cookies.id) {
        next();
    } else {
        //重定向
        response.redirect('/login.html');
    }

});

//初始化映射
loader.init(app);

//接收post请求 第一个参数接口，第二个拿什么解析文件
app.post('/upload', uploadSingle.single('file'), (request, response) => {
    //上传文件的文件名
    console.log(request.file.originalname);
    //上传文件的大小
    console.log(request.file.size);
    //上传文件存到哪个目录下
    console.log(request.file.path);
    /**有两种传参方式
     * 1.拼接在url的后面，将request.url转为url对象，找到query属性，拿到参数
     * 2.放在form表单中,放在request的数据体（body）传上来的。request.body.xxx*/
    //将文件信息存入数据库
    userMsgDao.insertUserMsg(request.body.name, request.file.path, request.file.originalname, request.file.size, (res) => {
        const resp = {path: request.file.path};
        response.writeHead(200);
        response.write(JSON.stringify(resp));
        response.end();
    });

});

/**返回图片的本质：是返回了图片的二进制数据流
 * 之前用express,自动的返回图片本质是：express框架，读取了图片文件，然后将这个文件的二进制流进行了返回
 * 文件的下载分为两种情况
 * 1.展示在页面里
 * 2.作为文件下载到本地 download属性以文件存储的形式下载到本地*/
//监听端口
app.listen(globalConf['port']);
