// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/index'
Vue.prototype.$axios=axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
//全局守卫
router.beforeEach((to, from, next) => {
  // alert('还没有登录，请先登录!');
  // next();
  // console.log(to.path);
  //判断store.gettes.isLogin===false
  /*if (to.path === '/Login' || to.path === '/Register') {
    next();
  } else {
    alert('还没有登录，请先登录!');
    next('/Login');
  }*/
  //判断页面是否需要登录
  const needLogin=to.matched.some(item=>item.meta&&item.meta.login);
  if (needLogin){
    const isLogin=document.cookie.includes('login=true');
    if (isLogin){
      next();
    } else {
      if (confirm('该页面需要登录后方为，要去登录吗？')===true){
        next('/Login');
      }
    }
  }else {
    next();
  }

});
//全局守卫后置钩子
/*router.afterEach((to,from)=>{
    alert('after Each');
});*/
