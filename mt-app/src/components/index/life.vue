<template>
  <div class="m-life">
    <el-row>
      <ul class="nav">
        <li>
          <router-link class="takeout" to="/">美团外卖</router-link>
        </li>
        <li>
          <router-link class="" to="/">猫眼电影</router-link>
        </li>
        <li>
          <router-link class="" to="/">美团酒店</router-link>
        </li>
        <li>
          <router-link class="apartment" to="/">民宿／公寓</router-link>
        </li>
        <li>
          <router-link class="business" to="/">商家入驻</router-link>
        </li>
        <li>
          <router-link class="" to="/">美团公益</router-link>
        </li>
      </ul>
    </el-row>

    <el-row>
      <el-col :span="14">
        <slider/>
      </el-col>

      <el-col :span="4">
        <div class="m-life-pic"></div>
      </el-col>

      <el-col :span="6">
        <div class="m-life-login">
          <h4><img alt="" src="//s0.meituan.net/bs/fe-web-meituan/2d05c2b/img/avatar.jpg"/></h4>
          <p class="m-life-login-name">Hi！{{$store.state.userName?$store.state.userName:'你好'}}</p>
          <div v-if="!$store.state.userName">
            <router-link :to="{name:'register'}">
              <el-button round>注册</el-button>
            </router-link>
            <router-link :to="{name:'login'}">
              <el-button round>立即登录</el-button>
            </router-link>
          </div>
        </div>
      </el-col>

    </el-row>

    <el-row>
      <el-col :span="7">
        <div class="m-life-hotel"></div>
      </el-col>
      <el-col :span="7">
        <div class="m-life-music"></div>
      </el-col>
      <el-col :span="4">
        <div class="m-life-coop"></div>
      </el-col>
      <el-col :span="6">
        <div class="m-life-downapp">
          <img alt="下载APP" src="//s1.meituan.net/bs/fe-web-meituan/60ac9a0/img/download-qr.png"/>
          <p>美团APP手机版</p>
          <p class="last-p"><span>1元起</span>吃喝玩乐</p>
        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  //右侧生活区组件
  //轮播图组件
  import Slider from './slider'

  export default {
    name: 'life',
    components: {
      Slider
    },
    data () {
      return {}
    }
  }
</script>

<style lang="scss">
  @import '@/assets/css/index/life.scss';
</style>
