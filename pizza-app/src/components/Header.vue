<template>
  <header>
    <!--Bootstrap navbar背景样式-->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="py-2" href="#">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             class="d-block mx-auto">
          <circle cx="12" cy="12" r="10"/>
          <line x1="14.31" y1="8" x2="20.05" y2="17.94"/>
          <line x1="9.69" y1="8" x2="21.17" y2="8"/>
          <line x1="7.38" y1="12" x2="13.12" y2="2.06"/>
          <line x1="9.69" y1="16" x2="3.95" y2="6.06"/>
          <line x1="14.31" y1="16" x2="2.83" y2="16"/>
          <line x1="16.62" y1="12" x2="10.88" y2="21.94"/>
        </svg>
      </a>
      <router-link :to="{path:'/'}" class="navbar-brand">Pizza点餐系统</router-link>
      <ul class="navbar-nav">
        <li>
          <router-link :to="{name:'Home'}" class="nav-link">主页</router-link>
        </li>
        <li v-for="item in linkList">
          <router-link :to="item.path" class="nav-link">{{item.name}}</router-link>
        </li>
      </ul>
      <!--ml-auto内容居右-->
      <ul class="navbar-nav ml-auto">
        <li>
          <router-link to="/Login" class="nav-link">登录</router-link>
        </li>
        <li>
          <router-link to="/Register" class="nav-link">注册</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      linkList: [
        { path: '/myCalendar', name: '日历' },
        { path: '/Admin', name: '管理' },
        { path: '/About', name: '关于我们' }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
