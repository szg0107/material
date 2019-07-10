<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <router-link to="/">
          <img alt="美团" src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"/>
        </router-link>
      </el-col>

      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input @blur="blur"
                    @focus="focus"
                    @input="input"
                    placeholder="请输入内容"
                    v-model="searchWord"/>
          <el-button icon="el-icon-search" type="primary"/>

          <dl class="hotPlace" v-if="isHotPlace">
            <dt>热门搜索</dt>
            <dd :key="index" v-for="(item,index) in hotPlaceList" v-if="index<5">
              <router-link :to="{name:'goods',params:{name:item}}">{{item}}</router-link>
            </dd>
          </dl>

          <dl class="searchList" v-if="isSearchList">
            <dd :key="index" v-for="(item,index) in searchList">
              <router-link :to="{name:'goods',params:{name:item}}">{{item}}</router-link>
            </dd>
          </dl>
        </div>

        <p class="suggest">
          <router-link :key="index" :to="{name:'goods',params:{name:item}}" v-for="(item,index) in suggestList">
            {{item}}
          </router-link>
        </p>
      </el-col>

    </el-row>
  </div>
</template>

<script>
  import http from '@/axios/api'

  export default {
    name: 'searchBar',
    data () {
      return {
        searchWord: '',
        // 是否获取光标
        isFocus: false,
        hotPlaceList: ['北京欢乐谷', '北京动物园', '八达岭长城', '十渡蹦极俱乐部', '梵高星空艺术馆', '胡大饭馆'],
        searchList: ['欢乐谷', '北京'],
        suggestList: ['北京欢乐谷', '北京动物园', '八达岭长城', '十渡蹦极俱乐部', '梵高星空艺术馆', '胡大饭馆']
      }
    },
    created () {
      http.searchHotWords().then(res => {
        // console.log(res)
        this.hotPlaceList = res.data.data
        this.suggestList = res.data.data
      })
    },
    // 计算属性
    computed: {
      // 是否显示热门搜索
      isHotPlace: function () {
        return this.isFocus && !this.searchWord
      },
      // 是否显示搜索列表
      isSearchList: function () {
        return this.isFocus && this.searchWord
      }
    },
    methods: {
      focus () {
        this.isFocus = true
      },
      blur () {
        const serf = this
        setTimeout(() => {
          serf.isFocus = false
        }, 1000)
      },
      input () {
        http.getSearchList().then(res => {
          // console.log(res)
          this.searchList = res.data.data.list.filter((item, index) => {
            return item.indexOf(this.searchWord) > -1
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
