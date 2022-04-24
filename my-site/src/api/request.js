import axios from 'axios';
import showMessage from '@/utils/showMessage';

const service = axios.create(); // 创建axios实例
// 响应拦截器
service.interceptors.response.use((res) => {
  if (res.data.code !== 0) {
    showMessage({
      content: res.data.msg,
      type: 'error',
      duration: 1500,
    });
    return null;
  }
  return res.data.data;
});
export default service;
