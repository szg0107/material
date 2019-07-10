<template>
  <div class="page-register">
    <div class="header">
      <header>
        <a class="site-logo" href="/"/>
        <div class="login">
          <span>已有美团账号</span>
          <router-link :to="{name:'login'}">登录</router-link>
        </div>
      </header>
    </div>

    <div class="content">
      <el-form :model="registerForm" :rules="rules" class="demo-ruleForm" label-width="100px" ref="registerForm"
               status-icon>
        <el-form-item label="用户名" prop="userName">
          <el-input type="text" v-model="registerForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input @input="input" autocomplete="off" type="password" v-model="registerForm.password"></el-input>
          <div class="pw-strength">
            <div :class="['bar',strengthClass]"></div>
            <div class="letter">
              <span>弱</span>
              <span>中</span>
              <span>强</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="确认密码" prop="rePassword">
          <el-input autocomplete="off" type="password" v-model="registerForm.rePassword"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="submitForm('registerForm')" type="primary">提交</el-button>
        </el-form-item>
      </el-form>
    </div>

    <footer>©meituan.com  京ICP证070791号  京公网安备11010502025545号</footer>
  </div>
</template>

<script>
  import http from '@/axios/api'

  export default {
    name: 'register',
    data () {
      const validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        } else if (value.length < 4 || value.length > 16) {
          callback(new Error('用户名必须为4-16位的字母数字下划线组成'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (value.length < 6 || value.length > 16) {
          callback(new Error('密码必须为6-16位的字母数字下划线组成'))
        } else {
          callback()
        }
      }
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        registerForm: {
          userName: '',
          password: '',
          rePassword: '',
        },
        strengthClass: '',
        rules: {
          userName: [{validator: validateUser, trigger: 'blur'}],
          password: [{validator: validatePass, trigger: 'blur'}],
          rePassword: [{validator: validatePass2, trigger: 'blur'}],
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            http.register({
              params:  this.registerForm
            }).then(res => {
                console.log(res)
              res.data.status === 'success' ? this.$router.push({name: 'login'}) : alert(res.data.ms)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      input () {
        let reg = /^[a-zA-Z0-9_]*$/g
        if (this.registerForm.password.length > 20 || (this.registerForm.password.length > 6 && this.registerForm.password.match(reg))) {
          this.strengthClass = 'strong'
        } else if (this.registerForm.password.length < 6) {
          this.strengthClass = 'week'
        } else if (!this.registerForm.password) {
          this.strengthClass = ''
        } else {
          this.strengthClass = 'normal'
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '@/assets/css/register/index.scss';
</style>
