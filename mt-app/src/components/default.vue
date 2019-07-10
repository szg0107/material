<template>
  <div class="layout-default">
    <el-container>
      <el-header height="100%">
        <my-header/>
      </el-header>

      <el-main>
        <router-view />
      </el-main>

      <el-footer height="100%">
        <my-footer/>
      </el-footer>

    </el-container>
  </div>
</template>

<script>
import MyHeader from './header/index'
import MyFooter from './footer/index'

export default {
  name: 'default',
  components: {
    MyHeader,
    MyFooter
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/public/layout.scss";
</style>
