<template>
  <ul class="hierarchical-list-container">
    <li v-for="(item,index) in list" :key="index+item.name">
      <span @click="handleClick(item)" :class="{active:item.isSelect}">{{ item.name }}</span>
      <span v-if="item.aside" @click="handleClick(item)" class="aside"
            :class="{ active: item.isSelect }">
        {{ item.aside }}
      </span>
      <HierarchicalList :list="item.children" @select="handleClick"/>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'HierarchicalList', // 文章-右侧层级组件
  props: {
    // [{name:'名称'，isSelect:(是否选中), children:[{name:'名称'，isSelect:(是否选中)}]]
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleClick(item) {
      if (!item.isSelect) {
        this.$emit('select', item);
      }
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.hierarchical-list-container {
  list-style: none;
  padding: 0;
  margin-left: 1em;
  li {
    min-height: 40px;
    line-height: 40px;
    font-size: 14px;
    cursor: pointer;
    .active {
      color: @warn;
      font-weight: bold;
    }
  }
}
.aside {
  font-size: 12px;
  margin-left: 1em;
  color: @gray;
}
</style>
