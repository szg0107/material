//用于操作文件路径
const path = require('path');
//全局匹配
const glob = require('glob-all');
//单独抽离html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
//深度js tree shaking插件
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
//单独抽离css文件 不能与style-loader共同使用
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//css tree shaking 抖掉没有用到的css 当匹配文件中有注释html 样式中对应的元素样式无法抖下去
const PurifyCSSPlugin = require('purifycss-webpack');
//清理重复生成的文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
//压缩css文件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
//调用webpack中的热更新模块
const WebPack=require('webpack');


module.exports = {
    //入口文件 可以多入口文件 多入口用对象，单入口用字符串
    entry: {
        index: './src/index.js'
    },
    //输出到哪个文件
    output: {
        //当前根目录dist文件夹
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        //导出模块的名字
        chunkFilename: '[name].chunk.js'
    },
    // webpack4新特性 用于打包多入口文件的公共代码替代了wbepack3中的CommonsChunkPlugin
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 注意: priority属性
                // 其次: 打包业务中公共代码
                // 自定义缓存组
                common: {
                    // name 提取文件名
                    name: "common",
                    // chunks: 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)
                    // 提取代码的范围   async创建异步公共代码流
                    chunks: "all",
                    // minChunks公共代码出现最少次数
                    minChunks: 2,
                    // 形成一个代码块需要的最小体积 默认30kb
                    minSize: 1,
                    // 设置打包顺序的优先级
                    priority: 0
                },
                // 首先: 打包node_modules中的文件
                vendor: {
                    name: "vendor",
                    // 匹配满足条件进行打包
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    // 设置打包顺序
                    priority: 10
                }
            }
        }
    },
    /**test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
     use 属性，表示进行转换时，应该使用哪个 loader。
     顺序是从后往前的（写在后面的先执行）*/
    module: {
        rules: [
            /**less-loader 解析less文件
             * css-loader 将less解析为css文件
             *style-loader 将css变为行间样式 */
            //处理css、less文件
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        //要在解析完css或less之后调用 postcss不单用与集成工具配合使用
                        loader: 'postcss-loader',
                        options: {
                            //针对于postcss使用的插件
                            ident: 'postcss',
                            plugins: [
                                require('postcss-cssnext')(),
                            ],
                        }
                    },
                    'less-loader'
                ]
            },
            //处理image文件
            {
                test: /\.(jpg|png|jpeg|gif)$/,
                use: [
                    //打包图片 可以根据图片大小打包出来或者抽成base64编码的图片
                    {
                        loader: 'url-loader',
                        options: {
                            //[ext]表示图片什么格式的
                            name: '[name].[ext]',
                            //限制图片大小《=100kb进行base64编码
                            limit: 100000,
                            //输出目录
                            outputPath: 'image',
                        },
                    },
                    //压缩图片
                    {
                        loader: 'img-loader',
                        options: {
                            plugins: [
                                //压缩jpeg的工具
                                require('imagemin-mozjpeg')({
                                    //压缩质量，范围0（最差）到100（完美）
                                    quality: 50,
                                }),
                            ]
                        }
                    }
                ],
            },
        ]
    },
    //插件引入
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            // filename: 'index.html' 文件名
            minify: {
                //清理注释
                removeComments: true,
                //去掉空格
                collapseWhitespace: true,
            },
        }),

        new MiniCssExtractPlugin({
            filename: '[name][hash:5].css',
            // chunkFilename: '[id].css',
        }),

        //css抖动一定要放在js抖动之前,否则会报错
        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync([
                path.join(__dirname, './src/*.html'),
                path.join(__dirname, './src/*.js')
            ]),
        }),

        new WebpackDeepScopeAnalysisPlugin(),

        new CleanWebpackPlugin(),

        new OptimizeCssAssetsWebpackPlugin(),

        // new WebPack.HotModuleReplacementPlugin(),

    ],
    //开启本地服务器
    devServer: {
        //修改端口号
        // port: '8888',
        //默认打开路径
        // contentBase:'dist',
        //开启热更新
        // hot:true,
    },
    //设置模式 development 开发模式 production 生产模式
    mode: 'development',
};