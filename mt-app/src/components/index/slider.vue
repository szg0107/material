<template>
  <div class="slide">
    <el-carousel height="240px">
      <el-carousel-item :key="item.img" v-for="item in imgList">
        <img :src="item.img" alt=""/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    name: 'slider',
    data () {
      return {
        imgList: [
          {
            url:'#',
            img:'https://p1.meituan.net/travelcube/01d2ab1efac6e2b7adcfcdf57b8cb5481085686.png'
          },
          {
            url:'#',
            img:'http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
