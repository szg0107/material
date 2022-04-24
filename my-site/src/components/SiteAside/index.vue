<template>
  <div class="site-aside-container">
    <div class="avatar-container">
      <el-avatar  src="http://mdrs.yuanjin.tech/FgMwAPYq17So9nwVH44ltDHo7u3c" :size="150"/>
    </div>
    <h1 class="title">龙傲天的小窝</h1>
    <Menu/>
    <Contact/>
    <p class="footer">
      黑ICP备17001719号
    </p>
  </div>
</template>

<script>
import Menu from '@/components/SiteAside/Menu/index.vue';
import Contact from '@/components/SiteAside/Contact/index.vue';

export default {
  name: 'SiteAside', // 左侧导航栏
  components: {
    Menu,
    Contact,
  },
  data() {
    return {};
  },
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
