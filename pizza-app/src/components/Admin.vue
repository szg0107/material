<template>
  <div>
    Admin
    姓名:<input type="text" v-model="names"/>
    <button @click="handleClick">确定</button>
  </div>
</template>

<script>
  export default {
    name: 'Admin',
    data() {
      return {
        // names:'henry',
        names:this.$store.state.admin.name,
      }
    },
    methods:{
      handleClick(){
        this.names='';
        this.$store.state.name='改变';
      }
    },
    //组件内的守卫(进入组件之前) 无法使用this用next的vm参数代替
    /*beforeRouteEnter:(to,from,next)=>{
      next(vm => {
        alert('hello'+vm.names);
      });
    },*/
    /**离开组件之前
     * to要去的路径包含的信息
     * from当前组件所在的路径的一些信息
     * next是否跳转*/
    beforeRouteLeave:(to, from, next) => {
      if (confirm('确定要离开吗？')===true){
        next();
      }else {
        next(false);
      }
    },
  }
</script>

<style scoped>

</style>
