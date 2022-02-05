<template>
  <img :src="url" alt=""/>
</template>

<script>
export default {
  name: 'Avatar', // 头像组件
  props: {
    url: {
      type: String,
      required: true, // 属性必填
      default: '',
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>

</style>
