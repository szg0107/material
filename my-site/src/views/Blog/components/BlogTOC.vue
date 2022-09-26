<template>
  <div class="blog-toc-container">
    <h2>目录</h2>
    <HierarchicalList :list="toWithSelect" @select="handleSelect"/>
  </div>
</template>

<script>
import eventBus from '@/eventBus';
import { debounce } from '@/utils';

export default {
  name: 'BlogTOC', // 文章目录
  components: {
    HierarchicalList: () => import('./HierarchicalList.vue'),
  },
  props: {
    toc: {
      type: Array,
    },
  },
  data() {
    return {
      activeAnchor: 'article-md-title-1', // 当前激活的锚点
    };
  },
  computed: {
    // 根据toc属性以及activeAnchor得到带有isSelect属性的toc数组
    toWithSelect() {
      // 将原来的Toc转换成新的对象
      const getTOC = (toc = []) => toc.map((t) => ({
        // 展开toc对象
        ...t,
        // toc.anchor是否等于当前选中菜单
        isSelect: t.anchor === this.activeAnchor,
        // 递归子元素
        children: getTOC(t.children),
      }));
      return getTOC(this.toc);
    },
    domList() {
      // 定义Dom集合
      const domList = [];
      // 遍历toc数组找到对应Dom元素
      const addToDomList = (toc) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const tocElement of toc) {
          // 添加dom元素
          domList.push(document.getElementById(tocElement.anchor));
          if (tocElement.children && tocElement.children.length) {
            // 递归子元素
            addToDomList(tocElement.children);
          }
        }
      };
      addToDomList(this.toc);
      return domList;
    },
  },
  methods: {
    // 右侧目录选中事件
    handleSelect(item) {
      // eslint-disable-next-line no-restricted-globals
      location.hash = item.anchor;
    },
    // 设置activeAnchor正确的值
    setSelect(scrollDom) {
      if (!scrollDom) {
        return;
      }
      this.activeAnchor = ''; // 后面重新设置先清空
      const range = 200; // 设置标题距顶部距离为选中状态
      // eslint-disable-next-line no-restricted-syntax
      for (const dom of this.domList) {
        // dom不存在跳过当前循环
        if (!dom) {
          // eslint-disable-next-line no-continue
          continue;
        }
        // 得到元素距视口顶部的距离
        const { top } = dom.getBoundingClientRect();
        // 在规定范围内
        if (top >= 0 && top <= range) {
          this.activeAnchor = dom.id;
          return;
        }
        if (top < range) {
          // 在规定范围上
          this.activeAnchor = dom.id; // 假设自己是激活的，然后继续往下看
        } else {
          // 在规定范围下
        }
      }
    },
  },
  created() {
    // setSelect设置防抖
    this.setSelectDebounce = debounce(this.setSelect);
    // 监听父容器滚动条滚动事件
    eventBus.$on('mainScroll', this.setSelectDebounce);
  },
  destroyed() {
    // 注销事件总线监听函数
    eventBus.$off('mainScroll', this.setSelectDebounce);
  },
};
</script>

<style scoped lang="less">
.blog-toc-container {
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>
