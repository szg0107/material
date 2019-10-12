<template>
  <div>
    {{num}}
    <button @click="addNum">增加</button>
  </div>

</template>

<script>
    export default {
        name: 'son',
        data() {
            return {}
        },
        props:['num','fun'],
        methods:{
            addNum(){
                this.fun(this.num*2);
            }
        }
    }
</script>

<style scoped>

</style>
