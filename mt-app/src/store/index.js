import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 在开发版开启严格模式
  strict: process.env.NODE_ENV !== 'production',
  /** 模块数据 根据功能让vuex分出模块
   * 无namespaced时,获取state、getters、mutations、actions
   * 除了state获取时需要加模块名，其它方法都是放在全局下的
   * 获取state:this.$store.state.moduleName.xxx,其它正常操作
   * 通过mapXXX方式拿到getters、mutations、actions；但是不能拿到state，若果想获取state需要加命名空间 namespaced:true,
   *
   * 有namespaced时，获取vuex中的数据(推荐使用有命名空间的方法)
   * 获取getters:this.$store['moduleName/getters'].xxx
   * 获取mutations：this.$store.commit('moduleName/xxx')
   * 获取actions：this.$store.dispatch('moduleName/xxx')
   * mapState('moduleName',['xxx']) mapXXX('moduleName',{}) */
  modules: {},
  /** 存放数据
   * 页面获取state的方法
   * this.$store.state.xxx
   * mapState([xxx])
   * mapState({newXXX:state=>state.xxx}) */
  state: {
    position: {},
    userName: ''
  },

  /** 相当于组件内的计算属性
   * getters里的方法可以有两个参数 state（获取state的值） getters（可以拿到getters中的值）
   * this.$store.getters.xxx
   * import {mapGetters} from 'vuex'
   * mapGetters([xxx])
   * mapGetters({newXXX:'xxx'}) */
  getters: {
    getPosition (state, getters) {
      return state.position
    }
  },

  /** 修改数据 改变vuex中的状态 只能执行同步的
   * mutations里的方法接收两参数 1.state 2.参数对象（可以多个参数）/参数 例如{name,age}
   * this.$store.commit('xxx')
   * mapMutations(['xxx'])
   * mapMutations({newXXX:'xxx'}) */
  mutations: {
    setPosition (state, {position}) {
      state.position = position
    },
    setUserName (state, value) {
      state.userName = value
    }
  },

  /** 异步修改数据操作 提交一个mutations，让mutations修改状态
   * actions中的方法名可以和mutations中重合
   * actions里的方法有两个参数 1.context（上下文）可以直接用{commit} 2参数对象同mutations
   * this.$store.dispatch('xxx')
   * mapActions(['xxx'])
   * mapActions({newXXX:'xxx'}) */
  actions: {
    setPosition ({commit}, value) {
      // 异步请求后端获取当前位置数据
      commit('setPosition', value)
    }
  }
})
