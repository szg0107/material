import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      // 如果路径错误跳转到首页
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Register.vue')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('./views/Index.vue'),
      redirect: '/index/StudentList',
      children: [
        {
          // 学生列表
          path: 'StudentList',
          name: 'StudentList',
          component: () => import('./views/StudentList')
        },
        {
          // 添加学生
          path: 'AddStudent',
          name: 'AddStudent',
          component: () => import('./views/AddStudent')
        },
        {
          // 用户列表
          path: 'UserList',
          name: 'UserList',
          component: () => import('./views/UserList')
        }
      ]
    }
  ]
})
