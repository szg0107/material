<template>
    <el-row class="m-header m-header-topbar">
      <el-col :span="10"> <geo /> </el-col>
      <el-col :span="14"><my-nav /> </el-col>
    </el-row>
</template>

<script>
import geo from './geo'
import myNav from './myNav'
export default {
  name: 'topBar',
  components: {
    geo,
    myNav
  }
}
</script>

<style lang="scss">
 @import '@/assets/css/public/header/topBar.scss';
</style>
