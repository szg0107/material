<template>
  <div class="page-changeCity">
    <el-row>
      <province/>
    </el-row>
    <el-row>
      <hot :list="hotList" title="热门城市："/>
    </el-row>
    <el-row>
      <hot :list="recentList" title="最近访问："/>
    </el-row>
    <el-row>
      <category/>
    </el-row>
  </div>
</template>

<script>
  import Province from '@/components/changeCity/province'
  import Hot from '@/components/changeCity/hot'
  import Category from '@/components/changeCity/category'
  import http from '@/axios/api'

  export default {
    name: 'changeCity',
    created () {
      const serf = this
      http.axios.all([http.getHotCity(), http.getRecentCity()])
        .then(http.axios.spread(function (hc, rc) {
          // 两个请求现在都执行完成
          // console.log(hc, rc)
          serf.hotList = hc.data.data
          serf.recentList = rc.data.data
        }))
    },
    data () {
      return {
        hotList: ['大庆',
          '哈尔滨',
          '齐齐哈尔',
          '鸡西',
          '鹤岗',
          '双鸭山',
          '伊春',
          '佳木斯',
          '七台河',],
        recentList: ['大庆',
          '哈尔滨',
          '齐齐哈尔',
          '鸡西',
          '鹤岗',
          '双鸭山',
          '伊春',
          '佳木斯',
          '七台河',]
      }
    },
    components: {
      Province,
      Hot,
      Category
    }
  }
</script>

<style scoped>

</style>
