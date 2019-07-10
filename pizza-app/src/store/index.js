import Vue from 'vue';
import Vuex from 'vuex';
import admin from './admin'
Vue.use(Vuex);

export default new Vuex.Store({
  //在开发版开启严格模式
  strict:process.env.NODE_ENV!=='production',
  /**模块数据 根据功能让vuex分出模块
   * 无namespaced时,获取state、getters、mutations、actions
   * 除了state获取时需要加模块名，其它方法都是放在全局下的
   * 获取state:this.$store.state.moduleName.xxx,其它正常操作
   * 通过mapXXX方式拿到getters、mutations、actions；但是不能拿到state，若果想获取state需要加命名空间 namespaced:true,
   *
   * 有namespaced时，获取vuex中的数据(推荐使用有命名空间的方法)
   * 获取getters:this.$store['moduleName/getters'].xxx
   * 获取mutations：this.$store.commit('moduleName/xxx')
   * 获取actions：this.$store.dispatch('moduleName/xxx')
   * mapState('moduleName',['xxx']) mapXXX('moduleName',{})*/
  modules:{
    admin,
  },
})
