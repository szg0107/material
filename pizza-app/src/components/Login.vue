<template>
  <div>
    Login
    <button @click="handleClick">登录</button>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {}
    },
    methods: {
      handleClick() {
        //cookie存储时长--900天
        const expires = 900 * 24 * 3600 * 1000,
              date=new Date(+new Date()+expires);
        //设置cookie
        document.cookie=`login=true;expires=${date.toUTCString()}`;

      }
    }
  }
</script>

<style scoped>

</style>
