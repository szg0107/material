import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/global.less';
import { showMessage } from '@/utils';
import './mock';
import vLoading from '@/directives/loading';
import vLazy from '@/directives/lazy';
import App from './App.vue';
import router from './router';
import store from './store'; // 使用vue插件

// 注册全局指令
Vue.directive('loading', vLoading);
Vue.directive('lazy', vLazy);
Vue.config.productionTip = false;
Vue.use(ElementUI);
// 给vue实例绑定属性
Vue.prototype.$showMessage = showMessage;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
