<template>
  <div class="formWrap">
    <div class="main_panel">
      <div class="title_line"></div>
      <div class="title">DUYI</div>
      <div class="title_line"></div>
      <input class="input" placeholder="用户名" type="text" v-model="userName"/>
      <input class="input" placeholder="邮箱" type="text" v-model="email"/>
      <input class="input" placeholder="密码" type="password" v-model="password"/>
      <input class="input" placeholder="确认密码" type="password" v-model="confirmPassword"/>
      <input class="input" placeholder="验证码" style="width: 60%;float: left;margin-left: 5px;" type="text"
             v-model="authCode"/>
      <span @click="changeCode()" style="margin: 20px 0 0 10px;display: inline-block;float: left" v-html="vCode"></span>
      <div @click="register()" class="register_btn" style="float: left;margin-left: 5px;">注册</div>
    </div>
  </div>
</template>

<script>
    import md5 from '../assets/js/activation_code'

    export default {
        name: 'register',
        data() {
            return {
                //用户名
                userName: '',
                //邮箱
                email: '',
                //密码
                password: '',
                //确认密码
                confirmPassword: '',
                //验证码左边
                authCode: '',
                //验证码图片
                vCode: '',
                //验证码对应的文字
                rightCode: '',
                isShow: false
            }
        },
        methods: {
            register() {
                if (this.password === this.confirmPassword && this.authCode === this.rightCode) {
                    api.register({
                        userName: this.userName,
                        email: this.email,
                        password: md5.jiami(this.password),
                    }).then(res => {
                        console.log(res);
                    })
                } else {
                    // console.log('两次密码不一样或验证码错误');
                    this.$message.error('两次密码不一样或验证码错误');
                    this.authCode = '';
                    this.changeCode();
                }

            },
            changeCode() {
                // console.log(this.toast.queryRandomCode());
                api.queryRandomCode().then(res => {
                    // console.log(res);
                    this.vCode = res.data.data.data;
                    this.rightCode = res.data.data.text;
                });
            }
        },
        mounted() {
            this.changeCode();
        }
    }
</script>

<style scoped>
  @import "../assets/css/main.css";
</style>
