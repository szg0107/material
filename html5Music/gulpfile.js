const gulp = require('gulp'),
    //html压缩
    htmlClean = require('gulp-htmlclean'),
    //压缩图片
    imageMin = require('gulp-imagemin'),
    //压缩js
    uglify = require('gulp-uglify'),
    //去掉js中的调试语句
    stripDebug = require('gulp-strip-debug'),
    //将less转化为css
    less = require('gulp-less'),
    //gulp-postcss + autoprefixer 添加前缀 .pipe(postcss([autoprofixer()]))
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    //压缩css
    cleanCss = require('gulp-clean-css'),
    //开启本地服务器代理
    connect = require('gulp-connect'),
    /**判断当前环境变量
     export/set NODE_ENV=development 设置环境变量
     development 开发环境
     production 生产环境*/
    devMod = process.env.NODE_ENV === 'development',
    folder = {
        src: 'src/',
        dist: 'dist/'
    };
console.log(devMod);
/**压缩html gulp-htmlclean
 * gulp中插件应用
 * 1.下载插件
 * 2.取到插件
 * 3.应用插件*/
//打包项目任务 gulp.task创建一个任务 4.0必须传入cb 并且在最后要调用
gulp.task('packagingProject', function (cb) {
    //gulp.src读取文件
    //从src下的html文件夹中读取文件并压缩输出到dist/html/下
    let html = gulp.src(folder.src + 'html/*');
    //如果不是开发环境，压缩html
    if (!devMod) {
        html.pipe(htmlClean());
    }
    //gulp.dest输出文件 pipe传输文件并对文件进行操 参数方法
    html.pipe(gulp.dest(folder.dist + 'html/'));

    gulp.src(folder.src + 'image/*')
        //压缩图片
        .pipe(imageMin())
        //输出到dist/image文件夹下
        .pipe(gulp.dest(folder.dist + 'image/'));

    let css = gulp.src(folder.src + 'css/*');
    //将less转换为css,并且添加前缀
    css.pipe(less()).pipe(postcss([autoprefixer()]));
    //如果不是开发环境，压缩css
    if (!devMod) {
        css.pipe(cleanCss());
    }
    //输出到dist/css文件夹下
    css.pipe(gulp.dest(folder.dist + 'css/'));

    let js = gulp.src(folder.src + 'js/*');
    //如果不是开发环境，压缩js、去掉js中的调试语句
    if (!devMod) {
        js.pipe(stripDebug());
        js.pipe(uglify());
    }
    //输出到dist/js文件夹下
    js.pipe(gulp.dest(folder.dist + 'js/'));

    cb();
});

//开启服务任务
gulp.task('openService', function (cb) {
    connect.server({
        //更默认改端口号
        // port:'8081'，
        //自动刷新浏览器
        livereload: true,
    });
    cb();
});

//监听任务
gulp.task('watch', function (cb) {
    //gulp.watch监听文件改变
    gulp.watch(folder.src + 'html/*', function (cb) {
        let html = gulp.src(folder.src + 'html/*');
        //浏览器自动刷新
        html.pipe(connect.reload());
        if (!devMod) {
            html.pipe(htmlClean())
        }
        html.pipe(gulp.dest(folder.dist + 'html/'));
        cb();
    });
    gulp.watch(folder.src + 'css/*', function (cb) {
        let css = gulp.src(folder.src + 'css/*');
        css.pipe(connect.reload()).pipe(less()).pipe(postcss([autoprefixer()]));
        if (!devMod) {
            css.pipe(cleanCss());
        }
        css.pipe(gulp.dest(folder.dist + 'css/'));
        cb();
    });
    gulp.watch(folder.src + 'js/*', function (cb) {
        let js = gulp.src(folder.src + 'js/*');
        js.pipe(connect.reload());
        if (!devMod) {
            js.pipe(stripDebug());
            js.pipe(uglify());
        }
        js.pipe(gulp.dest(folder.dist + 'js/'));
        cb();
    });
    cb();
});

//默认任务 gulp.series相当于 任务组
gulp.task('default', gulp.series('packagingProject', 'openService', 'watch'));