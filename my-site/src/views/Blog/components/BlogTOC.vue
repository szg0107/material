<template>
  <div class="blog-toc-container">
    <h2>目录</h2>
    <HierarchicalList :list="toc" @select="handleSelect" />
  </div>
</template>

<script>
export default {
  name: 'BlogTOC', // 文章目录
  components: {
    HierarchicalList: () => import('./HierarchicalList.vue'),
  },
  props: {
    toc: {
      type: Array,
    },
  },
  methods: {
    handleSelect(item) {
      // eslint-disable-next-line no-restricted-globals
      location.hash = item.anchor;
    },
  },
};
</script>

<style scoped lang="less">
.blog-toc-container {
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>
