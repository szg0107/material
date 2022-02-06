<template>
  <div class="test-container">
    <div class="item" v-for="t in types" :key="t">
      <Icon :type="t" />
      <label>{{ t }}</label>
    </div>
  </div>
</template>

<script>
import Icon, { types } from '.';

export default {
  name: 'IconTest',
  components: {
    Icon, /** npm install -g @vue/cli-service-global 单独编译组件工具 vue serve ./src/views/Home.vue 命令 */
  },
  data() {
    return {
      types,
    };
  },
};
</script>

<style scoped>
.test-container {
  display: flex;
  justify-content: center;
  margin: 30px auto;
  width: 580px;
  flex-wrap: wrap;
}
.item {
  margin: 1em;
  text-align: center;
}
</style>
