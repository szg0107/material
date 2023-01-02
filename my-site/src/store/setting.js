import { getSetting } from '@/api/setting';
import { titleController } from '@/utils';

export default {
  namespaced: true,
  state: {
    loading: false,
    data: null,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setData(state, payload) {
      state.data = payload;
    },
  },
  actions: {
    async fetchSetting(ctx) {
      ctx.commit('setLoading', true);
      const resp = await getSetting();
      ctx.commit('setData', resp);
      ctx.commit('setLoading', false);
      // 修改浏览器页签图标
      if (resp.favicon) {
        // <link rel="shortcut icon " type="images/x-icon" href="./favicon.ico">
        // 查找是否存在link元素
        let link = document.querySelector('link[ref=\'shortcut icon\']');
        if (link) {
          return;
        }
        // 创建link元素
        link = document.createElement('link');
        // 设置属性
        link.rel = 'shortcut icon';
        // 设置图标类型
        link.type = 'images/x-icon';
        // 设置图标地址
        link.href = resp.favicon;
        // 将link元素增加到head中
        document.querySelector('head')
          .appendChild(link);
      }
      // 设置网站标题
      if (resp.siteTitle) {
        titleController.setSiteTitle(resp.siteTitle);
      }
    },
  },
};
