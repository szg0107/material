<template>
  <div class="project-container" ref="projectContainer">
    <div v-for="item in projectObj" :key="item.id" class="project-item">
      <a :href="item.url ? item.url : `javascript:alert('该项目无法通过外网访问')`"
         :target="item.url ? '_blank' : '_self'">
        <img class="thumb" v-lazy="item.thumb" alt="" src=""/>
      </a>
      <div class="info">
        <h2>
          <a :href="item.url ? item.url : `javascript:alert('该项目无法通过外网访问')`"
             :target="item.url ? '_blank' : '_self'">{{ item.name }}</a>
        </h2>
        <a class="github" target="_blank" :href="item.github" v-if="item.github">github</a>
        <p v-for="(desc, i) in item.description" :key="i">
          {{ desc }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import mainScroll from '@/mixins/mainScroll';
import { getProjects } from '@/api/project';

export default {
  name: 'Project', // 项目&amp;效果
  data() {
    return {
      projectObj: [],
    };
  },
  mixins: [mainScroll('projectContainer')],
  created() {
    // 获取项目效果数据
    getProjects().then((res) => {
      this.projectObj = res;
    });
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.project-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.project-item {
  transition: 0.5s;
  padding: 20px;
  display: flex;
  margin-bottom: 20px;

  &:hover {
    box-shadow: -1px 1px 5px #000;
    transform: scale(1.01) translate(3px, -3px);
    color: inherit;
  }

  .thumb {
    width: 250px;
    min-height: 150px;
    flex: 0 0 auto;
    object-fit: cover;
    border-radius: 5px;
    margin-right: 15px;
  }

  .info {
    line-height: 1.7;
    flex: 1 1 auto;

    h2 {
      margin: 0;
    }
  }

  .github {
    font-size: 14px;
    color: @primary;
  }
}
</style>
