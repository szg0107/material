<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <my-menu/>
      </el-col>
      <el-col :span="19">
        <life/>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <Container :nav="iStyle"/>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <Container :nav="discounts"/>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import myMenu from '@/components/index/menu'
  import Life from '@/components/index/life'
  import Container from '@/components/index/container'

  export default {
    name: 'index',
    data () {
      return {
        iStyle: {
          class: 'istyle',
          title: '有格调',
          list: [
            {
              text: '全部',
              tab: 'all'
            },
            {
              text: '约会聚餐',
              tab: 'food'
            },
            {
              text: '丽人SPA',
              tab: 'spa'
            },
            {
              text: '电影演出',
              tab: 'movie'
            },
            {
              text: '品质出游',
              tab: 'travel'
            }
          ]
        },
        discounts: {
          class: 'youhui',
          title: '狠优惠',
          list: [
            {
              text: '全部',
              tab: 'all'
            },
            {
              text: '美食',
              tab: 'food'
            },
            {
              text: '休闲',
              tab: 'xiuxian'
            },
          ]
        },
      }
    },
    components: {
      myMenu,
      Life,
      Container
    }
  }
</script>

<style lang="scss">
  @import '@/assets/css/index/index.scss';
</style>
