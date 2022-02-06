<template>
  <div class="empty-container">
    <Icon type="empty"/>
    <p>{{text}}</p>
  </div>
</template>

<script>
import Icon from '../Icon/index.vue';

export default {
  name: 'Empty', // 无数据组件展示
  components: {
    Icon,
  },
  props: {
    text: {
      type: String,
      default: '无数据',
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="less">
@import '~@/styles/mixin.less'; // ~@等于src
@import '~@/styles/var.less';
.empty-container{
  .self-center();
  color: @gray;
  text-align: center;
}
.icon-container{
  font-size: 72px;
}
</style>
