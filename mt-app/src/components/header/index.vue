<template>
  <div class="m-header">
    <el-row><topBar /></el-row>
    <el-row><searchBar /></el-row>
  </div>
</template>

<script>
import searchBar from './searchBar'
import topBar from './topBar'

export default {
  name: 'index',
  components: {
    topBar,
    searchBar
  }
}
</script>

<style lang="scss">
  @import '@/assets/css/public/header/index.scss';
</style>
