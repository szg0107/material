<template>
  <div class="blog-comment-container">
    <MessageArea
      title="评论列表"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import fetchData from '@/mixins/fetchData';
import { getComments, postComment } from '@/api/blog';

export default {
  name: 'BlogComment', // 文章-留言
  mixins: [fetchData({ total: 0, rows: [] })],
  components: {
    MessageArea: () => import('@/components/MessageArea/index.vue'),
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  methods: {
    async fetchData() {
      return getComments(this.$route.params.id, this.page, this.limit);
    },
    async handleSubmit(formData, callback) {
      const resp = await postComment({
        blogId: this.$route.params.id,
        ...formData,
      });
      this.data.rows.unshift(resp);
      // eslint-disable-next-line no-plusplus
      this.data.total++;
      callback('评论成功'); // 告诉子组件，我这边处理完了，你继续
    },
  },
};
</script>

<style scoped lang="less">
.blog-comment-container {
  margin: 30px 0;
}
</style>
