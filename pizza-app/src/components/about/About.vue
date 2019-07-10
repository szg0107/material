<template>
  <div>
    <div class="row mb-5">
      <div class="col-4">
        <!--导航-->
        <div class="list-group mb-5">
          <router-link class="nav-link list-group-item list-group-item-action" to="History">
            历史订单
          </router-link>
          <router-link class="nav-link list-group-item list-group-item-action" :to="{name:'Contact'}">
            联系我们
          </router-link>
          <router-link class="nav-link list-group-item list-group-item-action" to="OrderingGuide">
            点餐文档
          </router-link>
          <router-link class="nav-link list-group-item list-group-item-action" to="Delivery">
            快递信息
          </router-link>
        </div>

      </div>
      <div class="col-8">
        <!--导航所对应的内容-->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'About',
    data() {
      return {}
    },
  }
</script>

<style scoped>

</style>
