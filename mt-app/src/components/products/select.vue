<template>
  <div class="m-product-select">
    <dl class="tab">
      <dt>{{name}}<i class="el-icon-caret-bottom" /></dt>
      <dd>
        <div class="select-title">{{name}}</div>

        <span v-for="(item,index) in list" :key="index">{{item.name}}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
  export default {
    name: 'mySelect',
    props:['name','list'],
    data () {
      return {}
    }
  }
</script>

<style scoped>

</style>
