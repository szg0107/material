<template>
  <div class="about-container">
    <iframe
      class="about-content"
      src="https://www.strml.net"/>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'About', // 关于
};
</script>

<style scoped lang="less">
.about-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.about-content {
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
}
</style>
