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
import eventBus from '@/eventBus';

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
  computed: {
    hasMore() {
      return this.data.rows.length < this.data.total;
    },
  },
  created() {
    eventBus.$on('mainScroll', this.handleScroll);
  },
  destroyed() {
    eventBus.$off('mainScroll', this.handleScroll);
  },
  methods: {
    // 组件滚动到哪
    async handleScroll(dom) {
      if (this.isLoading || !dom) {
        // 目前正在加载更多
        return;
      }
      const range = 100; // 定一个可接受的范围，在这个范围内都算达到了底部
      // dom.scrollTop 滚动条滚动的高度 dom.clientHeight 可见高度 dom.scrollHeight 容器所有内容高度
      const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
      if (dec <= range) {
        // 到达底部
        await this.fetchMore();
      }
    },
    // 获取数据
    async fetchData() {
      return getComments(this.$route.params.id, this.page, this.limit);
    },
    // 加载更多数据
    async fetchMore() {
      if (this.hasMore) {
        this.isLoading = true;
        this.page += 1;
        const resp = await this.fetchData();
        this.data.total = resp.total;
        this.data.rows = this.data.rows.concat(resp.rows);
        this.isLoading = false;
      }
    },
    // 提交评论
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
