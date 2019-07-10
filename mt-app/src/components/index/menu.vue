<template>
  <div class="m-menu">
    <dl @mouseleave="menuLeave" class="nav">
      <dt>全部分类</dt>
      <dd :key="index" @mouseenter="menuEnter(item)" v-for="(item,index) in menuList">
        <i :class="item.type"></i>
        {{item.name}}
        <span class="arrow"></span>
      </dd>
    </dl>

    <div @mouseenter="detailEnter" @mouseleave="detailLeave" class="detail" v-if="curDetail">
      <template v-for="(item,index) in curDetail.items">
        <h4 :key="index">{{item.title}}</h4>
        <span :key="value+'_'+i" v-for="(value,i) in item.items">{{value}}</span>
      </template>
    </div>
  </div>
</template>

<script>
  import http from '@/axios/api'
  // 菜单组件
  export default {
    name: 'myMenu',
    created () {
      http.getMenuList().then(res=>{
        // console.log(res)
        this.menuList=res.data.data;
      })
    },
    data () {
      return {
        curDetail: null,
        menuList: [
          {
            icon: 'food',
            title: '美食',
            children:[
              {
                title:'美食',
                children:['代金券','甜点饮品','火锅自助餐','小吃','快餐','日韩料理']
              }
            ]
          },
          {
            icon: 'takeout',
            title: '外卖'
          },
          {
            icon: 'hotel',
            title: '酒店HOT'
          },
          {
            icon: 'homestay',
            title: '榛果民宿'
          },
          {
            icon: 'movie',
            title: '猫眼电影'
          },
          {
            icon: 'airport',
            title: '机票 / 火车票'
          },
          {
            icon: 'ktv',
            title: '休闲娱乐 / KTV'
          },
          {
            icon: 'life',
            title: '生活服务'
          },
          {
            icon: 'hair',
            title: '丽人 / 美发 / 医学美容'
          },
          {
            icon: 'marry',
            title: '结婚 / 婚纱摄影 / 婚宴'
          },
          {
            icon: 'offspring',
            title: ' 亲子 / 儿童乐园 / 幼教'
          },
          {
            icon: 'sport',
            title: '运动健身 / 健身中心'
          },
          {
            icon: 'furniture',
            title: '家装 / 建材 / 家居'
          },
          {
            icon: 'study',
            title: '学习培训 / 音乐培训'
          },
          {
            icon: 'health',
            title: ' 医疗健康 / 宠物 / 爱车'
          },
          {
            icon: 'bar',
            title: '酒吧 / 密室逃脱'
          },
        ],
      }
    },
    methods: {
      // 菜单移入事件
      menuEnter (item) {
        this.curDetail = item
      },
      //菜单鼠标移出事件
      menuLeave () {
        const self = this
        this.timer = setTimeout(() => {
          self.curDetail = ''
        }, 2000)
      },
      // 详情移入事件
      detailEnter () {
        clearTimeout(this.timer)
      },
      detailLeave(){
        this.curDetail = ''
      }
    }
  }
</script>

<style scoped>

</style>
