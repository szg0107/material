<template>
  <div @click="handleClick" v-show="show" class="to-top-container">
    Top
  </div>
</template>

<script>
// import eventBus from '@/eventBus';

export default {
  name: 'ToTop', // 回到顶部组件
  data() {
    return {
      show: false,
    };
  },
  created() {
    // 主区域滚动条位置变化后触发
    this.$bus.$on('mainScroll', this.handleScroll);
  },
  destroyed() {
    this.$bus.$off('mainScroll', this.handleScroll);
  },
  methods: {
    // 滚动条滚动事件
    handleScroll(dom) {
      if (!dom) {
        this.show = false;
        return;
      }
      this.show = dom.scrollTop >= 500;
    },
    handleClick() {
      // 回到顶部 设置主区域滚动条位置
      this.$bus.$emit('setMainScroll', 0);
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.to-top-container {
  background: @primary;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: fixed;
  z-index: 99;
  right: 50px;
  bottom: 50px;
  cursor: pointer;
  line-height: 50px;
  color: #fff;
  text-align: center;
}
</style>
