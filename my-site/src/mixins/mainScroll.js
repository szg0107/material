// 处理主滚动条
// import eventBus from '@/eventBus';

export default function (refValue) {
  return {
    mounted() {
      this.$nextTick(() => {
        this.$bus.$on('setMainScroll', this.handleSetMainScroll);
        // 给主容器注册滚动事件
        this.$refs[refValue].addEventListener('scroll', this.handleMainScroll);
      });
    },
    methods: {
      // 滚动条发生变化
      handleMainScroll() {
        // 给事件总线绑定触发事件 方法名 触发对象
        this.$bus.$emit('mainScroll', this.$refs[refValue]);
      },
      // 回到顶部
      handleSetMainScroll(scrollTop) {
        this.$refs[refValue].scrollTop = scrollTop;
      },
    },
    beforeDestroy() {
      this.$bus.$emit('mainScroll');
      // 组件销毁时注销监听
      this.$refs[refValue].removeEventListener('scroll', this.handleMainScroll);
      this.$bus.$off('setMainScroll', this.handleSetMainScroll);
    },
  };
}
/** export default function (refValue) {
  return {
    mounted() {
      this.$bus.$on('setMainScroll', this.handleSetMainScroll);
      this.$refs[refValue].addEventListener('scroll', this.handleMainScroll);
    },
    beforeDestroy() {
      this.$bus.$emit('mainScroll');
      this.$bus.$off('setMainScroll', this.handleSetMainScroll);
      this.$refs[refValue].removeEventListener('scroll', this.handleMainScroll);
    },
    methods: {
      handleSetMainScroll(scrollTop) {
        this.$refs[refValue].scrollTop = scrollTop;
      },
      handleMainScroll() {
        this.$bus.$emit('mainScroll', this.$refs[refValue]);
      },
    },
  };
} */
