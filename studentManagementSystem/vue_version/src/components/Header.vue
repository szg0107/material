<template>
  <div class="myHeader">
    <div class="logo">
      <img alt="渡一教育" src="../assets/img/logo.png"/>
      <span>渡一教育</span>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'myHeader',
        data() {
            return {}
        }
    }
</script>

<style lang="less" scoped>
  .myHeader {
    width: 100%;
    height: 70px;
    background-color: #354457;

    .logo {
      width: 200px;
      height: 70px;
      line-height: 70px;
      font-size: 14px;
      color: #b3bcc5;
      padding-left: 20px;

      img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }

    }
  }
</style>
