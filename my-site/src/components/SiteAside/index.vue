<template>
  <div class="site-aside-container">
    <template v-if="data">
      <div class="avatar-container">
        <el-avatar  :src="data.avatar" :size="150"/>
      </div>
      <h1 class="title">{{data.siteTitle}}</h1>
    </template>
    <Menu/>
    <Contact/>
    <p v-if="data" class="footer">
      {{data.icp}}
    </p>
  </div>
</template>

<script>
import Menu from '@/components/SiteAside/Menu/index.vue';
import Contact from '@/components/SiteAside/Contact/index.vue';
import { mapState } from 'vuex';

export default {
  name: 'SiteAside', // 左侧导航栏
  components: {
    Menu,
    Contact,
  },
  data() {
    return {};
  },
  computed: mapState('settings', ['data']),
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";

.site-aside-container {
  width: 100%;
  height: 100%;
  background: @dark;
  padding: 20px 0;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}

.avatar-container {
  margin: 0 auto;
  text-align: center;
}

.footer {
  text-align: center;
  font-size: 12px;
  margin-top: 25px;
}

.title {
  font-size: 1.2em;
  color: #fff;
  text-align: center;
}
</style>
