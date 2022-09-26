<template>
  <Layout>
    <div ref="mainContainer" class="main-container" v-loading="isLoading">
      <BlogDetail :blog="data" v-if="data" />
      <BlogComment v-if="!isLoading" />
    </div>
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <BlogTOC :toc="data.toc" v-if="data"/>
      </div>
    </template>
  </Layout>
</template>

<script>
import fetchData from '@/mixins/fetchData';
import { getBlog } from '@/api/blog';
import mainScroll from '@/mixins/mainScroll';

export default {
  name: 'Detail', // 文章详情
  mixins: [fetchData(null), mainScroll('mainContainer')],
  components: {
    Layout: () => import('@/components/Layout/index.vue'),
    BlogDetail: () => import('./components/BlogDetail.vue'),
    BlogTOC: () => import('./components/BlogTOC.vue'),
    BlogComment: () => import('./components/BlogComment.vue'),
  },
  methods: {
    // 获取文章详情数据
    async fetchData() {
      return getBlog(this.$route.params.id);
    },
  },
  updated() {
    // 更新地址栏信息
    // eslint-disable-next-line no-restricted-globals,prefer-destructuring
    const hash = location.hash;
    // eslint-disable-next-line no-restricted-globals
    location.hash = '';
    setTimeout(() => {
      // eslint-disable-next-line no-restricted-globals
      location.hash = hash;
    }, 50);
  },
};
</script>

<style scoped lang="less">
.main-container {
  overflow-y: scroll;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  width: 100%;
  overflow-x: hidden;
  scroll-behavior: smooth;
}
.right-container {
  width: 300px;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  position: relative;
  padding: 20px;
}
</style>
