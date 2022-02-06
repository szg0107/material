<template>
  <div class="image-loader-container">
    <img v-if="!everythingDone" class="placeholder" :src="placeholder" alt=""/>
    <img
      @load="handleLoad"
      :src="src"
      alt=""
      :style="{ opacity: originOpacity, transition: `${duration}ms` }"
    />
  </div>
</template>

<script>
export default {
  name: 'ImageLoader', // 图片加载
  props: {
    src: { // 原始图片的路径
      type: String,
      required: true,
    },
    placeholder: { // 原始图片加载完成前的占位图片
      type: String,
      required: true,
    },
    duration: { // 原始图片加载完成后，切换到原始图经过的毫秒数
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      originLoaded: false, // 原图是否加载完成
      everythingDone: false, // 过度动画执行完成
    };
  },
  computed: {
    originOpacity() {
      return this.originLoaded ? '1' : '0';
    },
  },
  methods: {
    handleLoad() {
      this.originLoaded = true;
      setTimeout(() => {
        this.everythingDone = true;
        this.$emit('load');
      }, this.duration);
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";

.image-loader-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  img {
    .self-fill();
    object-fit: cover;
  }

  .placeholder {
    filter: blur(2vw);
  }
}
</style>
