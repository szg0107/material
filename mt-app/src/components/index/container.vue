<template>
  <div class="m-istyle">
    <dl :class="nav.class" @mouseover="over">
      <dt>{{nav.title}}</dt>
      <dd :class="{active : kind===item.tab}"
          :data-type="item.tab"
          :key='index'
          v-for="(item,index) in nav.list">{{item.text}}
      </dd>
    </dl>

    <ul class="ibody">
      <li :key="index" v-for="(item,index) in resultsData[kind]">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img :src="item.image"
               class="image"/>
          <div class="cbody">
            <div :title="item.title" class="title">{{item.title}}</div>
            <div :title="item.sub_title" class="sub-title">{{item.sub_title}}</div>
            <!-- v-if="item.rentNum && item.price_info.current_price"-->
            <div class="price-info">
<!--              <span class="current-price-wrapper">-->
<!--                <span class="price-symbol numfont">¥</span>-->
<!--                <span class="current-price numfont">{{item.price_info.current_price}}</span>-->
<!--              </span>-->
<!--              <span class="old-price">门市价¥{{item.price_info.old_price}}</span>-->
              <span class="current-price-wrapper">
                <span class="price-symbol numfont">¥</span>
                <span class="current-price numfont">{{item.price}}</span>
              </span>
              <span class="sold bottom-right-info">{{item.address}}</span>
            </div>

            <!--            <div class="price-info" v-else-if="!item.rentNum">-->
            <!--              <span class="current-price-wrapper">-->
            <!--                <span class="price-symbol numfont">¥</span>-->
            <!--                <span class="current-price numfont">抢光了</span>-->
            <!--              </span>-->
            <!--              <span class="sold bottom-right-info">{{item.address}}</span>-->
            <!--            </div>-->

            <!--            <div class="price-info" v-else>-->
            <!--              <span class="current-price-wrapper">-->
            <!--                <span class="price-symbol numfont">¥</span>-->
            <!--                <span class="current-price numfont">{{item.price_info.avg_price}}</span>-->
            <!--                <span class="units">/{{item.price_info.units}}</span>-->
            <!--              </span>-->
            <!--              <span class="sold bottom-right-info">{{item.address}}</span>-->
            <!--            </div>-->

          </div>
        </el-card>
      </li>
    </ul>
  </div>
</template>

<script>
  import http from '@/axios/api'

  export default {
    name: 'container',
    props: ['nav'],
    created () {
      http.getResultProducts().then(res => {
        // console.log(res);
        this.resultsData = res.data.data
      })
    },
    data () {
      return {
        list: [
          {
            image: '//p0.meituan.net/msmerchant/1a8aaac8cfcf76fae83c2ecd6405bd4c1457315.jpg@368w_208h_1e_1c',
            title: '北京饭店阳光咖啡厅',
            sub_title: '特价自助晚餐',
            price_info: {
              current_price: 238,
              old_price: 298
            },
            rentNum: 1,
            address: '王府井/东单'
          },
          {
            image: '//p1.meituan.net/bbia/f87d6a8fe3ecd78a0f3b6bb26c1317be680018.png@368w_208h_1e_1c',
            title: '北京金茂万丽酒店·R BAR大堂吧',
            sub_title: '蛋糕6选1,约6英寸，圆',
            price_info: {
              current_price: 368,
              old_price: 498
            },
            rentNum: 0,
            address: '王府井/东单'
          },
          {
            image: '//p0.meituan.net/msmerchant/775fa45a4ec9dbe6bc6f353ec489756e104350.jpg@368w_208h_1e_1c',
            title: '新屿悦和食汇',
            sub_title: '自助单人餐',
            price_info: {
              current_price: null,
              old_price: null,
              avg_price: 188,
              units: '人均'
            },
            rentNum: 1,
            address: '王府井/东单'
          },
        ],
        kind: 'all',
        resultsData: {}
      }
    },
    methods: {
      over (e) {
        const dom = e.target,
          targetName = dom.tagName.toLowerCase()
        if (targetName !== 'dd') {
          return false
        }
        this.kind = dom.getAttribute('data-type')
        // 动态获取数据
      }
    }
  }
</script>

<style lang="scss">
  @import '@/assets/css/index/artistic.scss';
</style>
