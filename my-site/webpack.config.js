const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

if (process.env.NODE_ENV === 'production') {
  module.exports = {
    devtool: 'none',
    plugins: [new BundleAnalyzerPlugin()],
    /** 静态资源分为static和assets
     * static:纯静态资源直接复制到dist文件夹中
     * assets：嵌入式静态资源参与打包；文件比较小不生成文件可能只是一个base64;文件比较大会生成到输出目录，文件会改一下名生成哈希编码
     * 告诉`webpack`不要对公共库进行打包；然后，在页面中手动加入`cdn`链接
     externals: {
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      axios: 'axios',
    }, */
  };
} else {
  module.exports = {};
}
