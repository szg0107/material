export default {
  //给模块定义命名空间
  namespaced:true,
  /**存放数据
   * 页面获取state的方法
   * this.$store.state.xxx
   * mapState([xxx])
   * mapState({newXXX:state=>state.xxx})*/
  state: {
    name: '测试',
  },

  /**相当于组件内的计算属性
   * getters里的方法可以有两个参数 state（获取state的值） getters（可以拿到getters中的值）
   * this.$store.getters.xxx
   * import {mapGetters} from 'vuex'
   * mapGetters([xxx])
   * mapGetters({newXXX:'xxx'})*/
  getters: {
    person(state, getters) {
      return `姓名：${state.name}`;
    }
  },

  /**修改数据 改变vuex中的状态 只能执行同步的
   *mutations里的方法接收两参数 1.state 2.参数对象（可以多个参数）/参数 例如{name,age}
   * this.$store.commit('xxx')
   * mapMutations(['xxx'])
   * mapMutations({newXXX:'xxx'})*/
  mutations: {
    changeName(state, {name}) {
      state.name = name;
    }
  },

  /**异步修改数据操作 提交一个mutations，让mutations修改状态
   *actions中的方法名可以和mutations中重合
   *actions里的方法有两个参数 1.context（上下文）可以直接用{commit} 2参数对象同mutations
   *this.$store.dispatch('xxx')
   * mapActions(['xxx'])
   * mapActions({newXXX:'xxx'})*/
  actions: {
    changeName({commit}, name) {
      setTimeout(() => {
        commit('changeName', name);
      }, 100);
    }
  },
}
