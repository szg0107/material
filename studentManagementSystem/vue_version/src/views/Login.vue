<template>
  <div class="main_panel">
    <div class="title_line"></div>
    <div class="title">DUYI</div>
    <div class="title_line"></div>
    <input class="input"  placeholder="用户名" type="text" v-model="userName"/>
    <input class="input"  placeholder="密码" type="password" v-model="password"/>
    <div class="register_btn" @click="login">登录</div>
    <router-link class="register_link" tag="div" to="/register">快速注册</router-link>
    <div class="register_link" onclick="javascript:location.href='/passprot/passprot.html'">忘记密码</div>
  </div>
</template>

<script>
  import md5 from '../assets/js/activation_code'
    export default {
        name: 'login',
        data() {
            return {
                userName: '',
                password: '',
            }
        },
        methods: {
            login(){
                api.login({
                    userName:this.userName,
                    password:md5.jiami(this.password)
                }).then((ref)=>{
                    // console.log(ref.data.data[0]);
                    this.$message.success('登录成功');
                    this.$router.push({name: 'index'});
                    //设置sessionStorage  JSON.stringify将对象转换成字符串
                    sessionStorage.setItem('userMessage', JSON.stringify(ref.data.data[0]));
                    console.log(sessionStorage.getItem('userMessage'));
                },(error)=>{
                    this.$message.error('用户名或密码错误!');
                })
            },
        },
        components: {},
    }
</script>
<style lang="scss">
  @import "../assets/css/main.css";

</style>
