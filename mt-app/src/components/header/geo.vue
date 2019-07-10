<template>
  <div class="m-geo">
    <div class="position">
      <i class="el-icon-location"/>
      {{$store.state.position.name}}
      <router-link :to="{name:'changeCity'}" class="changeCity">切换城市</router-link>
      [
      <a href="#" v-for="(item,index) in nearCity" :ke="index"> {{item.name}} </a>
      ]
    </div>

    <div class="m-user" v-if="!$store.state.userName">
      <router-link :to="{name:'login'}" class="login">立即登录</router-link>
      <router-link :to="{name:'register'}" class="register">注册</router-link>
    </div>

  </div>

</template>

<script>
  import http from '@/axios/api'

  export default {
    name: 'geo',
    created () {
      http.getCurPosition().then(res => {
        // console.log(res)
        this.$store.dispatch('setPosition', {position: res.data.data})
        this.nearCity = res.data.data.nearCity
      })

    },
    data () {
      return {
        nearCity: []
      }
    }
  }
</script>

<style scoped>

</style>
