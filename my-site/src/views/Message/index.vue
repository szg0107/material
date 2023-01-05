<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea
      title="留言板"
      :subTitle="`(${data.total})`"
      :isListLoading="isLoading"
      :list="data.rows"
      @submit="handleSubmit"/>
  </div>
</template>

<script>
import fetchData from '@/mixins/fetchData';
import * as msgApi from '@/api/message';
import mainScroll from '@/mixins/mainScroll';
// @ is an alias to /src
export default {
  name: 'Message', // 留言板
  components: {
    MessageArea: () => import('@/components/MessageArea/index.vue'),
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll('messageContainer')],
  created() {
    this.$bus.$on('mainScroll', this.handleScroll);
  },
  destroyed() {
    this.$bus.$off('mainScroll', this.handleScroll);
  },
  computed: {
    hasMore() {
      return this.data.rows.length < this.data.total;
    },
  },
  methods: {
    async fetchData() {
      return msgApi.getMessages(this.page, this.limit);
    },
    async handleScroll(dom) {
      if (this.isLoading || !dom) {
        // 目前正在加载更多
        return;
      }
      const range = 100; // 顶一个可接受的范围，在这个范围内都算达到了底部
      const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
      if (dec <= range) {
        await this.fetchMore();
      }
    },
    // 加载下一页
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
    async handleSubmit(data, callback) {
      const resp = await msgApi.postMessage(data);
      callback('感谢您的留言');
      this.data.rows.unshift(resp);
    },
  },
};
</script>
<style scoped lang="less">
.message-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 25px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
.message-area-container {
  width: 700px;
  margin: 0 auto;
}
</style>
