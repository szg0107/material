<template>
  <div class="blog-category-container" v-loading="isLoading">
    <h2>文章分类</h2>
    <HierarchicalList :list="list" @select="handleSelect"/>
  </div>
</template>

<script>
import fetchData from '@/mixins/fetchData';
import { getBlogCategories } from '@/api/blog';

export default {
  name: 'BlogCategory', // 文章分类
  mixins: [fetchData([])],
  components: {
    HierarchicalList: () => import('./HierarchicalList.vue'),
  },
  computed: {
    categoryId() {
      return +this.$route.params.categoryId || -1;
    },
    limit() {
      return +this.$route.query.limit || 10;
    },
    list() {
      // 获取全部条数
      const totalArticleCount = this.data.reduce((a, b) => a + b.articleCount, 0);
      const result = [{
        name: '全部',
        id: -1,
        articleCount: totalArticleCount,
      }, ...this.data];
      return result.map((item) => ({
        ...item,
        isSelect: item.id === this.categoryId,
        aside: `${item.articleCount}篇`,
      }));
    },
  },
  methods: {
    // 获取文章类别
    async fetchData() {
      // eslint-disable-next-line no-return-await
      return await getBlogCategories();
    },
    // 类型点击事件
    handleSelect(item) {
      const query = {
        page: 1,
        limit: this.limit,
        total: item.articleCount,
      };
      // 跳转到 当前的分类id  当前的页容量  newPage的页码
      if (item.id === -1) {
        this.$router.push({
          name: 'Blog',
          query,
        });
      } else {
        this.$router.push({
          name: 'CategoryBlog',
          query,
          params: {
            categoryId: item.id,
          },
        });
      }
    },
  },
  watch: {
    list: {
      handler(n, o) {
        if (n.length !== o.length) {
          const query = {
            page: 1,
            limit: this.limit,
            total: n[0].articleCount,
          };
          this.$router.push({ name: 'Blog', query });
        }
      },
      deep: true, // 开启深度侦听
    },
  },
};
</script>

<style scoped lang="less">
.blog-category-container {
  width: 300px;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  height: 100%;
  overflow-y: auto;

  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>
