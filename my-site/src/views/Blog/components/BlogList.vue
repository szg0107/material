<template>
  <div class="blog-list-container" ref="container" v-loading="isLoading">
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb" v-if="item.thumb">
          <RouterLink :to="{name:'BlogDetail',params: {id:item.id}}">
            <img :src="item.thumb" :alt="item.title" :title="item.title"/>
          </RouterLink>
        </div>
        <div class="main">
          <RouterLink :to="{name:'BlogDetail',params: {id:item.id}}">
            <h2>{{ item.title }}</h2>
          </RouterLink>
          <div class="aside">
            <span>日期：{{ formatDate(item.createDate) }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论：{{ item.commentNumber }}</span>
            <RouterLink :to="{name:'CategoryBlog',params:{categoryId: item.category.id}}">
              {{ item.category.name }}
            </RouterLink>
          </div>
          <div class="desc">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>
    <!-- 分页放到这里 -->
    <div style="text-align: center;margin-top: 20px">
      <el-pagination
        @current-change="handlePageChange"
        :current-page.sync="routeInfo.page"
        :page-sizes="[10]"
        :page-size.sync="routeInfo.limit"
        :background=true
        layout=" prev, pager, next,total,jumper"
        :total="data.total"/>
    </div>

  </div>
</template>

<script>
import fetchData from '@/mixins/fetchData';
import { getBlogs } from '@/api/blog';
import { formatDate } from '@/utils';

export default {
  name: 'BlogList', // 文章列表
  mixins: [fetchData({})],
  computed: {
    // 获取路由信息
    routeInfo() {
      const categoryId = +this.$route.params.categoryId || -1;
      const page = +this.$route.query.page || 1;
      const limit = +this.$route.query.limit || 10;
      const total = +this.$route.query.total || 2000;
      return {
        categoryId,
        page,
        limit,
        total,
      };
    },
  },
  methods: {
    // 时间戳转日期
    formatDate,
    // 获取文章列表
    async fetchData() {
      // eslint-disable-next-line no-return-await
      return await getBlogs(this.routeInfo.page, this.routeInfo.limit, this.routeInfo.categoryId,
        this.routeInfo.total);
    },
    handlePageChange(newPage) {
      const query = {
        page: newPage,
        limit: this.routeInfo.limit,
        total: this.routeInfo.total,
      };
      if (this.routeInfo.categoryId === -1) {
        this.$router.push({
          name: 'Blog',
          query,
        });
      } else {
        this.$router.push({
          name: 'CategoryBlog',
          query,
          params: {
            categoryId: this.routeInfo.categoryId,
          },
        });
      }
    },
  },
  watch: {
    async $route() {
      this.isLoading = true;
      // 滚动高度为0
      this.$refs.container.scrollTop = 0;
      this.data = await this.fetchData();
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";

.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}

li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;
  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }
  .main {
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .aside {
    font-size: 12px;
    color: @gray;
    span {
      margin-right: 15px;
    }
  }
  .desc {
    margin: 15px 0;
    font-size: 14px;
  }
}
</style>
