<template>
  <div class="page-product">
    <el-row class="m-crumbs">
      <crumbs />
    </el-row>
    <el-row>
      <el-col :span="19">
        <category />
        <list />
      </el-col>
      <el-col :span="5">
        <img src="@/assets/img/map.png" alt="图片" class="map" style="margin-left: 10px;width: 228px"/>
        <fav />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Crumbs from '../components/products/crumbs'
  import Category from '../components/products/category'
  import List from '../components/products/list'
  import Fav from '../components/products/fav'
  export default {
    name: 'goodList',
    components: {
      Crumbs,
      Category,
      List,
      Fav
    },
    data () {
      return {}
    }
  }
</script>

<style lang="scss">
  @import '@/assets/css/products/index.scss';
</style>
