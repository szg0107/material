// 处理主滚动条
import eventBus from '@/eventBus';

export default function (refValue) {
  return {
    mounted() {
      this.$nextTick(() => {
        eventBus.$on('setMainScroll', this.handleSetMainScroll);
        // 给主容器注册滚动事件
        this.$refs[refValue].addEventListener('scroll', this.handleScroll);
      });
    },
    methods: {
      // 滚动条发生变化
      handleScroll() {
        // 给事件总线绑定触发事件 方法名 触发对象
        eventBus.$emit('mainScroll', this.$refs[refValue]);
      },
      // 回到顶部
      handleSetMainScroll(scrollTop) {
        this.$refs[refValue].scrollTop = scrollTop;
      },
    },
    beforeDestroy() {
      eventBus.$emit('mainScroll');
      // 组件销毁时注销监听
      this.$refs[refValue].removeEventListener('scroll', this.handleScroll);
      eventBus.$off('setMainScroll', this.handleSetMainScroll);
    },
  };
}
