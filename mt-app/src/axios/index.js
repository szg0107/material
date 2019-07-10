import axios from 'axios'

// 基础域名路径
axios.defaults.baseURL = 'http://api.duyiedu.com/api/meituan/'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.params = {
    ...config.params,
    appkey: 'szg0107_1553776746206'
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
export default axios
