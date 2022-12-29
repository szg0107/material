import Vue from 'vue';
import Vuex from 'vuex';
import banner from './banner';
import settings from './setting';

Vue.use(Vuex); // 引用vuex插件

export default new Vuex.Store({
  // 仓库配置对象
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    banner,
    settings,
  },
  strict: true, // 使 Vuex store 进入严格模式，在严格模式下，任何 mutation 处理函数以外修改 Vuex state 都会抛出错误。
});
