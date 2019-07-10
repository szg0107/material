<template>
  <div id="app" class="container">
    <app-header></app-header>
    <router-view/>
    <div class="row">
        <router-view name="OrderingGuide" class="col-sm-12 col-md-4"></router-view>
        <router-view name="Delivery" class="col-sm-12 col-md-4"></router-view>
        <router-view name="History" class="col-sm-12 col-md-4"></router-view>
    </div>
  </div>
</template>

<script>
  import appHeader from './components/Header'

  export default {
    components: {
      'app-header': appHeader,
    },
    name: 'App'
  }
</script>

<style>
</style>
