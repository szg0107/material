<template>
  <Layout>
    <BlogList/>
    <template #right>
      <BlogCategory/>
    </template>
  </Layout>
</template>

<script>
export default {
  name: 'Blog', // 文章
  components: {
    BlogCategory: () => import('./components/BlogCategory.vue'),
    BlogList: () => import('./components/BlogList.vue'),
    Layout: () => import('@/components/Layout/index.vue'),
  },
};
</script>
