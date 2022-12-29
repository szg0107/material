import { getBanners } from '@/api/banner'; // 获取banner数据

export default {
  namespaced: true, // 启用命名空间
  state: {
    loading: false, // 加载状态
    banners: [], // banners数据
  },
  mutations: {
    // 设置加载状态
    setLoading(state, payload) {
      state.loading = payload;
    },
    // 设置banner数据
    setBanners(state, payload) {
      state.banners = payload;
    },
  },
  actions: {
    async fetchBanner(ctx) {
      // 避免重复请求banner数据
      if (ctx.state.banners.length) {
        return;
      }
      ctx.commit('setLoading', true); // 设置加载状态为true
      const resp = await getBanners(); // 获取banner数据
      ctx.commit('setBanners', resp); // 设置banner数据
      ctx.commit('setLoading', false); // 设置加载状态为false
    },
  },
};
