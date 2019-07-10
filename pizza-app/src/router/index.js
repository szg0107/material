import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home' //主页
//二级路由
import Contact from '../components/about/Contact'//联系我们
import Delivery from '../components/about/Delivery'//快递信息
import History from '../components/about/History'//历史订单
import OrderingGuide from '../components/about/OrderingGuide'//点餐文档

Vue.use(Router);

export default new Router({
  //去掉#/
  mode: 'history',
  routes: [
    {
      //如果路径错误跳转到首页
      path: '*',
      redirect: '/'
    },
    {
      //主页
      path: '/',
      name: 'Home',
      //router-view展示一个页面
      // component: Home
      //多个router-view展示多个页面
      components: {
        default: Home,
        'OrderingGuide': OrderingGuide,
        'Delivery': Delivery,
        'History': History,
      }
    },
    {
      //菜单
      path: '/Menu',
      name: 'Menu',
      component: () => import('../components/Menu'),
    },
    {
      //管理
      path: '/Admin',
      name: 'Admin',
      component: ()=>import('../components/Admin'),

      //路由独享的守卫
      /*beforeEnter:(to,from,next)=>{
        // alert('非登录状态，不能访问此页面');
        // next(false);

        if (to.path === '/Login' || to.path === '/Register') {
          next();
        } else {
          alert('还没有登录，请先登录!');
          next('/Login');
        }
      }*/
    },
    {
      //关于我们
      path: '/About',
      name: 'About',
      component: ()=>import('../components/about/About'),
      //二级路由默认展示那个页面(重定向)
      redirect: '/About/Contact',
      //路由元信息
      meta:{
        login:true,
      },
      children: [
        {
          //联系我们
          path: 'Contact',
          name: 'Contact',
          component: Contact,
        },
        {
          //快递信息
          path: 'Delivery',
          name: 'Delivery',
          component: Delivery,
        },
        {
          //历史订单
          path: 'History',
          name: 'History',
          component: History,
        },
        {
          //点餐文档
          path: 'OrderingGuide',
          name: 'OrderingGuide',
          component: OrderingGuide,
        },
      ],
    },
    {
      //登录
      path: '/Login',
      name: 'Login',
      component: ()=>import('../components/Login'),
    },
    {
      //注册
      path: '/Register',
      name: 'Register',
      // component: Register
      //懒加载写法
      component: () => import('../components/Register')
    },

  ],
  //路由滚动行为
  /*scrollBehavior(to, from, savedPosition) {
    // return {x:0,y:100}
    if (savedPosition) {
      return savedPosition;
    } else {
      return {x: 0, y: 100};
    }
  },*/
})
