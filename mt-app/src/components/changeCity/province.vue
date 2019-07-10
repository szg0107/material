<template>
  <div>
    <span class="name">按省份选择:</span>
    <m-select :list="provinceList"
              :showWrapperActive="provinceActive"
              :value="province"
              @change="changeProvince"
              @change_active="changeProvinceActive"
              className="province"
              title="省份"/>

    <m-select
      :disabled="cityDisabled"
      :list="cityList"
      :showWrapperActive="cityActive"
      :value="city"
      @change="changeCity"
      @change_active="changeCityActive"
      className="city"
      title="城市"/>
    <span>直接搜索：</span>
    <el-select
      :loading="loading"
      :remote-method="remoteMethod"
      filterable
      placeholder="请输入关键词"
      remote
      reserve-keyword
      v-model="searchWord">
      <el-option
        :key="item"
        :label="item"
        :value="item"
        v-for="item in searchList">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import MSelect from './select'
  import http from '@/axios/api'
  // 省份选择插件
  export default {
    name: 'province',
    created () {
      http.getProvince().then(res => {
        this.provinceList = res.data.data.map(item => {
          item.name = item.provinceName
          return item
        })
      })
    },
    data () {
      return {
        // 省份列表
        provinceList: [
          '山东',
          '甘肃',
          '江苏',
          '北京',
          '云南',
          '海南',
          '浙江',
          '上海',
          '天津',
          '陕西',
          '新疆',
          '贵州',
          '安徽',
          '澳门',
          '湖南',
          '河北',
          '香港',
          '辽宁',
          '四川',
          '宁夏',
          '吉林',
          '福建',
          '湖北',
          '广东',
          '重庆',
          '山西',
          '江西',
          '黑龙江',
          '青海',
          '河南',
          '台湾',
          '内蒙古',
          '西藏',
          '广西',],
        // 省份值
        province: '省份',
        // 城市列表
        cityList: [
          '大庆',
          '哈尔滨',
          '齐齐哈尔',
          '鸡西',
          '鹤岗',
          '双鸭山',
          '伊春',
          '佳木斯',
          '七台河',
          '牡丹江',
          '黑河',
          '绥化',],
        // 城市值
        city: '城市',
        // 是否显示省份列表
        provinceActive: false,
        cityActive: false,
        searchList: ['大庆',
          '哈尔滨',
          '齐齐哈尔',
          '鸡西',
          '鹤岗',
          '双鸭山'],
        searchWord: '',
        loading: false,
        cityDisabled: true
      }
    },
    methods: {
      changeProvinceActive (flag) {
        this.provinceActive = flag
        flag ? this.cityActive = false : ''
      },
      changeCityActive (flag) {
        this.cityActive = flag
        flag ? this.provinceActive = false : ''
      },
      changeProvince (item) {
        // console.log(value)
        this.cityDisabled = false
        this.province = item.name
        this.cityList = item.cityInfoList
      },
      changeCity (item) {
        this.city = item.name
        this.cityActive = false
        this.$store.dispatch('setPosition',{position:item})
        this.$router.push({name:'index'})
      },
      remoteMethod (e) {
        // 请求后端接口
        console.log(e)
      }
    },
    components: {
      MSelect
    }
  }
</script>

<style lang="scss">
  @import '@/assets/css/changecity/iselect.scss';
</style>
