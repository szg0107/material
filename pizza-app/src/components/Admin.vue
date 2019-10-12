<template>
  <div>
    Admin
    姓名:<input type="text" v-model="name"/>
    <button @click="handleClick">确定</button>

    <Son :num="this.$store.state.admin.num" :fun="updateNum"/>
  </div>
</template>

<script>
    import {mapState} from 'vuex';
    import Son from "./son";
    export default {
        name: 'Admin',
        components: {Son},
        data() {
            return {
                name: 'henry',
                // names: this.$store.state.admin.name,
            }
        },
        //获取state
        computed: {
            ...mapState('admin', {storeName: state => state.name})
        },
        methods: {
            handleClick() {
                this.$store.commit('admin/changeName', {name:this.name});
                console.log(this.$store.state.admin.name);
            },
            updateNum(data){
                console.log(data);
                this.$store.dispatch('admin/changeNum',data);
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
        beforeRouteLeave: (to, from, next) => {
            if (confirm('确定要离开吗？') === true) {
                next();
            } else {
                next(false);
            }
        },
    }
</script>

<style scoped>

</style>
