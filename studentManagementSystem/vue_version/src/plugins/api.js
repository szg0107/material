// 自定义方法组件
import Vue from 'vue'

// 设置post头
function postAddConfig (url, params) {
  return Vue.axios.post(url, params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
}

/* js主体 */
const myPlugin = {}
const _api = {
  // 查询验证码
  queryRandomCode: () => postAddConfig('queryRandomCode'),
  // 登录
  login: params => postAddConfig('login', params),
  // 注册
  register: params => postAddConfig('addUser', params),
  // 查询所有用户
  queryAllUser: params => postAddConfig('queryAllUser', params),
  // 添加学生
  addStudent: params => postAddConfig('insertStudent', params),
  // 分页查询所有学生
  queryStudentByPage: params => postAddConfig('queryStudentByPage', params),
  // 查询所有学生数量
  queryStudentCount: params => postAddConfig('queryStudentCount', params),
  // 根据关键字模糊查询学生
  queryStudentByKeyWord: params => postAddConfig('queryStudentByKeyWord', params),
  // 根据id修改学生信息
  updateStudentById: prams => postAddConfig('updateStudentById', prams),
  // 根据id删除学生
  deleteStudentById: prams => postAddConfig('deleteStudentById', prams),
  // 根据用户id分页查询所有学生
  queryStudentByUserId: params => postAddConfig('queryStudentByUserId', params),
  // 根据用户id查询所有学生数量
  queryStudentCountByUserId: params => postAddConfig('queryStudentCountByUserId', params),
  // 根据用户id根据关键字模糊查询学生
  queryStudentByKeyWordAndUserId: params => postAddConfig('queryStudentByKeyWordAndUserId', params),
}

myPlugin.install = function (Vue, options) {
  Vue.api = _api
  window.api = _api
  Object.defineProperties(Vue.prototype, {
    api: {
      get () {
        return _api
      }
    },
    $api: {
      get () {
        return _api
      }
    }
  })
}
Vue.use(myPlugin)
export default myPlugin
