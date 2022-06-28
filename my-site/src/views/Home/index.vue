<template>
<!-- wheel鼠标滚动效果  transitionend 过渡效果结束 自定义指令 v-loading="isLoading"-->
  <div class="home-container"
       ref="container"
       @wheel="handleWheel"
       @transitionend="handleTransitionEnd">
    <ul class="carousel-container" :style="{marginTop}">
      <li v-for="item in banners" :key="item.id">
        <CarouselsItem :carousel="item"/>
      </li>
    </ul>

    <div class="icon icon-up" v-show="index >= 1" @click="switchTo(index - 1)">
      <Icon type="arrowUp"/>
    </div>
    <div class="icon icon-down" v-show="index < banners.length - 1" @click="switchTo(index + 1)">
      <Icon type="arrowDown"/>
    </div>

    <ul class="indicator">
      <li :class="{active: i === index}"
          v-for="(item, i) in banners"
          :key="item.id"
          @click="switchTo(i)"/>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import getBanners from '@/mock/banner';

export default {
  name: 'Home', // 首页
  components: {
    CarouselsItem: () => import('@/views/Home/CarouselsItem.vue'),
    Icon: () => import('@/components/Icon/index.vue'),
  },
  data() {
    return {
      banners: getBanners.data, // 轮播图数据
      index: 0, // 当前显示的是第几张轮播图
      containerHeight: 0, // 整个容器的高度
      switching: false, // 是否正在切换
    };
  },
  mounted() {
    // 获取整个容器的高度
    this.containerHeight = this.$refs.container.clientHeight;
    // 监听窗口高度改变
    window.addEventListener('resize', this.handleResize);
  },
  destroyed() {
    // 移除监听窗口高度事件
    window.removeEventListener('resize', this.handleResize);
  },
  computed: {
    marginTop() {
      return `${-this.index * this.containerHeight}px`;
    },
  },
  methods: {
    // 切换轮播图
    switchTo(i) {
      this.index = i;
    },
    // 鼠标滚动事件
    handleWheel(e) {
      if (this.switching) {
        return;
      }
      if (e.deltaY < -5 && this.index > 0) {
        // 往上滚动
        this.switching = true;
        this.index -= 1;
      } else if (e.deltaY > 5 && this.index < this.banners.length - 1) {
        // 往下滚动
        this.switching = true;
        this.index += 1;
      }
    },
    // 过渡动画结束监听
    handleTransitionEnd() {
      this.switching = false;
    },
    handleResize() {
      this.containerHeight = this.$refs.container.clientHeight;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";
.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  ul{
    margin: 0;
    list-style: none;
    padding: 0;
  }
  .carousel-container {
    width: 100%;
    height: 100%;
    transition: 500ms;
    li {
      width: 100%;
      height: 100%;
    }
  }
  .icon{
    .self-center(); //调用居中方法
    font-size: 30px;
    color: @gray;
    cursor: pointer;
    transform: translateX(-50%);
    @gap:15px; // 定义变量
    &.icon-up{
      top: @gap;
      animation: jump-up 2s infinite;
    }
    &.icon-down{
      top: auto;
      bottom: @gap;
      animation: jump-down 2s infinite;
    }
    @jump: 5px;
    @keyframes jump-up{
      0% {
        transform: translate(-50%, @jump);
      }
      50% {
        transform: translate(-50%, -@jump);
      }
      100% {
        transform: translate(-50%, @jump);
      }
    }
    @keyframes jump-down {
      0% {
        transform: translate(-50%, -@jump);
      }
      50% {
        transform: translate(-50%, @jump);
      }
      100% {
        transform: translate(-50%, -@jump);
      }
    }
  }
  .indicator{
    .self-center();
    transform: translateY(-50%);
    left: auto;
    right: 20px;
    li {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: @words;
      cursor: pointer;
      margin-bottom: 10px;
      border: 1px solid #fff;
      box-sizing: border-box;
      &.active {
        background: #fff;
      }
    }
  }
}
</style>
