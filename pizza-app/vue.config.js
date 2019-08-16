const path = require('path');
module.exports = {
  //打包文件不生成map.js
  productionSourceMap: false,
  //设置输出目录
  outputDir:'./myDist',
  //设置公共路径
  // publicPath: process.env.NODE_ENV === 'production' ? 'http://www.duyiedu.com' : '/',
  //设置静态资源路径
  assetsDir:'assets',
  //获取webPack配置
  /*chainWebpack: config => {
    //给components文件夹起别名
    config.resolve.alias.set('_c', path.resolve(__dirname, 'src/components'));
  }*/
};
