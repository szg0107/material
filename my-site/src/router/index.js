import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '@/router/routes';
import { titleController } from '@/utils';

Vue.use(VueRouter);
const router = new VueRouter({
  /** vue-router提供了三种路由模式：
   *1.hash：默认值。路由从浏览器地址栏中的hash部分获取路径，改变路径也是改变的hash部分。该模式兼容性最好。
   *2.history：路由从浏览器地址栏的location.pathname中获取路径，改变路径使用的H5的history api。
   该模式可以让地址栏最友好，但是需要浏览器支持history api
   * 3.abstract：路由从内存中获取路径，改变路径也只是改动内存中的值。这种模式通常应用到非浏览器环境中。 */
  mode: 'history',
  base: process.env.BASE_URL,
  routes, // 路由配置规则
});
router.afterEach((to) => {
  if (to.meta.title) {
    titleController.setRouteTitle(to.meta.title);
  }
});
export default router;
