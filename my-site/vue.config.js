// vue-cli配置文件
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
      },
    },
  },
};
