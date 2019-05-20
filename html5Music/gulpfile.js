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
     export NODE_ENV=development 设置环境变量
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
//打包项目
gulp.task('packagingProject', function (cb) {
    //从src下的html文件夹中读取文件并压缩输出到dist/html/下
    let html = gulp.src(folder.src + 'html/*');
    if (!devMod) {
        html.pipe(htmlClean());
    }
    html.pipe(gulp.dest(folder.dist + 'html/'));

    gulp.src(folder.src + 'image/*')
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + 'image/'));

    let css = gulp.src(folder.src + 'css/*');
    css.pipe(less()).pipe(postcss([autoprefixer()]));
    if (!devMod) {
        css.pipe(cleanCss());
    }
    css.pipe(gulp.dest(folder.dist + 'css/'));

    let js = gulp.src(folder.src + 'js/*');
    if (!devMod) {
        js.pipe(stripDebug());
        js.pipe(uglify());
    }
    js.pipe(gulp.dest(folder.dist + 'js/'));

    cb();
});

//开启服务
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

gulp.task('default', gulp.series('packagingProject', 'openService', 'watch'));