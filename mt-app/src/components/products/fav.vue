<template>
  <div class="recommend-box">
    <div class="label">猜你喜欢</div>
    <div style="box-sizing: border-box;margin: 10px 0" v-for="(item,index) in recommendList" :key="index">
      <div class="img-box">
        <img alt="图片" src="@/assets/img/logo.png" style="font-size: 0"/>
      </div>

      <p class="title">{{item.title}}</p>
      <div class="rate">
        <el-rate
          disabled
          score-template="{value}"
          text-color="#ff9900"
          v-model="item.score"/>
        <span class="comment-number">{{item.commentNum}}个评价</span>
      </div>
      <p class="desc">{{item.areaName}}</p>
      <div class="price-box">
        <span class="yuan">￥</span>
        <span class="price-number numfont">{{item.lowPrice}}</span>
        <span class="price-desc">起</span>
      </div>

    </div>
  </div>
</template>

<script>
  import http from '@/axios/api'

  export default {
    name: 'fav',
    created () {
      http.getRecommendList().then(res => {
        // console.log(res)
        this.recommendList = res.data.data
        this.recommendList = res.data.data.map(item => {
          item.score = parseFloat(item.score)
          return item
        })
      })
    },
    data () {
      return {
        recommendList: []
      }
    }
  }
</script>

<style lang="scss">
  .recommend-box {
    margin: 10px 0 0 10px;
    background-color: #fff;
    border: 1px solid #E5E5E5;
    border-radius: 4px;
    padding: 16px 20px 0;
    width: 230px;
    box-sizing: border-box;

    .label {
      font-size: 16px;
      color: #333;
      line-height: 22px;
      font-weight: 500;
    }

    .img-box {
      height: 0;
      width: 100%;
      padding-bottom: 56.25%;
      background-color: #f4f4f4;
      background-size: cover;
      background-position: 50% 50%;
      border-radius: 4px;
      overflow: hidden;
    }

    .title {
      font-size: 14px;
      color: #222;
      line-height: 20px;
      width: 100%;
      margin-top: 10px;
      font-weight: 500;
    }

    .rate {
      .el-rate {
        display: inline-block;

        .el-rate__icon {
          font-size: 12px;
        }
      }
    }

    .comment-number {
      font-size: 12px;
      color: #999;
      height: 24px;
      line-height: 24px;
      margin-left: 10px;
    }

    .desc {
      font-size: 12px;
      color: #999;
      width: 100%;
      height: 18px;
      line-height: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 4px;
    }

    .price-box {
      color: #F60;

      .yuan {
        font-size: 14px;
        font-weight: 700;
      }

      .price-number {
        font-size: 22px;
        letter-spacing: -.5;
      }

      .numfont {
        font-family: numbers !important;
        letter-spacing: -.5px;
      }

      .price-desc {
        font-size: 12px;
        margin-left: 4px;
        font-weight: 700;
      }
    }
  }
</style>
