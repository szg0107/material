<template>
  <div class="message-area-container">
    <DataForm v-on="$listeners" />
    <h3>
      {{ title }}
      <span>{{ subTitle }}</span>
    </h3>
    <DataList :list="list" />
    <div class="loading" v-loading="isListLoading"></div>
  </div>
</template>

<script>
export default {
  name: 'MessageArea', // 留言组件
  props: {
    title: { // 标题
      type: String,
      default: '',
    },
    subTitle: { // 留言条数
      type: String,
      default: '',
    },
    list: { // 留言列表
      type: Array,
      default: () => [],
    },
    isListLoading: { // 留言列表加载状态
      type: Boolean,
      default: false,
    },
  },
  components: {
    DataForm: () => import('./DataForm.vue'),
    DataList: () => import('./DataList.vue'),
  },
};
</script>

<style scoped lang="less">
.loading {
  position: relative;
  height: 100px;
}
</style>
