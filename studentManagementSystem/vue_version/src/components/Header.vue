<template>
  <div class="myHeader">
    <div class="logo">
      <img alt="渡一教育" src="../assets/img/logo.png"/>
      <span>渡</span>
      <span class="yi">一</span>
      <span class="teach">教</span>
      <span class="yu">育</span>
      <div class="userMessage">欢迎，{{userName}}
        <a style="margin-left: 10px;color: #f40;cursor: pointer;" @click="quit">退出</a>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
        name: 'myHeader',
        data() {
            return {
                userName: JSON.parse(sessionStorage.getItem('userMessage')).user_name,
            }
        },
        methods: {
            quit() {
                this.$message.success('账号已退出!');
                this.$router.push({name: 'login'});
            }
        }
    }
</script>

<style lang="less" scoped>
  .myHeader {
    width: 100vw;
    height: 4.5rem;
    background: linear-gradient(90deg, #333, #222, #111);

    .logo {
      width: 100vw;
      height: 4.5rem;
      line-height: 4.5rem;
      font-size: 14px;
      color: #b3bcc5;
      background: url("../assets/img/bg.png") repeat center center;
      display: flex;
      align-items: center;
      position: absolute;

      img {
        width: 3rem;
        height: 3rem;
        margin-left: 20px;
        opacity: 1;
      }

      span {
        font-size: 1.7rem;
        color: #fff;
        font-weight: bolder;
        margin-left: 1rem;
        text-shadow: 4px 2px 6px #ccc;
        animation: jump .7s infinite alternate;
      }

      .yi {
        animation-delay: .25s;
      }

      .teach {
        animation-delay: .5s;
      }

      .yu {
        animation-delay: .75s;
      }

      @keyframes jump {
        100% {
          transform: translateY(-20px);
        }
      }

      .userMessage {
        margin-left: 74vw;
      }
    }
  }
</style>
