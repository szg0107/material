<template>
  <div class="page-login">
    <div class="login-header">
      <a class="logo" href="http://www.meituan.com"/>
    </div>

    <div class="login-panel">
      <div class="banner">
        <img alt="美团网" height="370"
             src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg" width="480"/>
      </div>

      <div class="form">
        <h4 class="tips" v-if="error">{{error}}</h4>
        <p><span>账号登录</span></p>

        <el-input
          :class="{error: error&& !userName}"
          placeholder="手机号/用户名/邮箱"
          prefix-icon="profile"
          v-model="userName"/>

        <el-input
          :class="{error: error&& !passWord}"
          placeholder="密码"
          prefix-icon="password"
          type="password"
          v-model="passWord"/>

        <div class="foot">
          <a href="#">忘记密码?</a>
        </div>

        <el-button @click="submit" class="btn-login" type="success">登录</el-button>

        <p class="reg">
          <span>还没有账号？</span>
          <router-link :to="{name:'register'}">免费注册</router-link>
        </p>

        <div class="oauth-wrapper J-oauth-wrapper">
          <h3 class="title-wrapper"><span class="title">用合作网站账号登录</span></h3>
          <div class="oauth cf">
            <span class="oauth__link oauth__link--qq third-login-btn" data-href="/account/connect/tencent"
                  id="J-third-tencent" target="_blank"></span>
            <span class="oauth__link oauth__link--weibo third-login-btn" data-href="/account/connect/sina"
                  id="J-third-sina" target="_blank"></span>
          </div>
          <i data-riskpartner="0" id="thirdLoginRiskpartner"></i>
        </div>
      </div>

    </div>

    <footer>
      <ul>
        <li><a href="#">关于美团</a></li>
        <li><a href="#">加入我们</a></li>
        <li><a href="#">商家入驻</a></li>
        <li><a href="#">帮助中心</a></li>
        <li><a href="#">美团手机版</a></li>
      </ul>
      <p>©2019 美团网团购 meituan.com 京ICP证070791号 京公网安备11010502025545号</p>
    </footer>
  </div>
</template>

<script>
  import http from '@/axios/api'

  export default {
    name: 'login',
    data () {
      return {
        userName: '',
        passWord: '',
        error: ''
      }
    },
    methods: {
      // 登录
      submit () {
        if (!this.userName) {
          this.error = '请输入账号'
          return false
        }
        if (!this.passWord) {
          this.error = '请输入密码'
          return false
        }
        http.login({
          params: {
            userName: this.userName,
            passWord: this.passWord
          }
        }).then(res => {
          // console.log(res)
          // res.data.status === 'success' ? this.$router.push({name: 'index'}) : this.error = res.data.ms
          if (res.data.status === 'success') {
            this.$router.push({name: 'index'})
            this.$store.commit('setUserName',this.userName)
          }else {
            this.error = res.data.ms
          }

        })
      }
    }
  }
</script>

<style lang="scss">
  @import '@/assets/css/login/index.scss';
</style>
