import axios from './index'

const api = {
  axios,
  // 获取热门搜索
  searchHotWords (params) {
    return axios.get('header/searchHotWords.json', params)
  },
  // 获取搜索列表
  getSearchList (params) {
    return axios.get('header/search.json', params)
  },
  // 获取左侧菜单列表
  getMenuList () {
    return axios.get('index/nav.json')
  },
  // 获取有格调数据
  getResultProducts () {
    return axios.get('index/resultsByKeywords.json')
  },
  // 获取产品展示列表
  getProductsList () {
    return axios.get('list/goodsList.json')
  },
  // 获取产品分类列表
  getClassicList () {
    return axios.get('list/classify.json')
  },
  // 获取推荐产品列表
  getRecommendList () {
    return axios.get('list/recommend.json')
  },
  // 获取商品详情
  getProductDetail () {
    return axios.get('product/detail.json')
  },
  // 获取热门城市
  getHotCity () {
    return axios.get('city/hot.json')
  },
  // 获取最近搜索城市
  getRecentCity () {
    return axios.get('city/recents.json')
  },
  // 获取省份
  getProvince () {
    return axios.get('city/province.json')
  },
  // 获取城市列表
  getCityList () {
    return axios.get('city/cityList.json')
  },
  // 获取当前位置
  getCurPosition () {
    return axios.get('city/getPosition.json')
  },
  // 登录
  login (params) {
    return axios.get('login', {params})
  },
  // 注册
  register (params) {
    return axios.get('register', {params})
  }
}
export default api
