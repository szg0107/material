import Vue from 'vue'
import Router from 'vue-router'
import PageDefault from '@/components/default'
import Index from '@/page/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'PageDefault',
      component: PageDefault,
      redirect: '/index',
      children: [
        {
          path: 'index',
          name: 'index',
          component: Index
        },
        {
          // 选择城市
          path: 'changeCity',
          name: 'changeCity',
          component: () => import('@/page/changeCity')
        },
        {
          // 商品列表
          path: 'goods/:name',
          name: 'goods',
          component: () => import('@/page/goodsList')
        },
        {
          // 商品详情
          path: 'productDetail',
          name: 'productDetail',
          component: () => import('@/page/productDetail')
        }
      ]
    },
    {
      path: '/blank',
      name: 'blank',
      component: () => import('@/components/blank'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/page/login')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/page/register')
        }
      ]
    }
  ]
})
