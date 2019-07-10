<template>
    <div class="m-hcity">
      <dl>
        <dt>{{title}}</dt>
        <dd v-for="(item,index) in list" :key="index">{{item.name}}</dd>
      </dl>
    </div>
</template>

<script>
  export default {
    name: 'hot',
    props: ['title','list'],
    data () {
      return {}
    }
  }
</script>

<style lang="scss">
@import '@/assets/css/changecity/hot.scss';
</style>
