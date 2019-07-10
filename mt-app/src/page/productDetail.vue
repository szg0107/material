<template>
  <div>
    <!--  面包屑 -->
    <el-row class="breadcrumbs">
      <crumbs/>
    </el-row>

    <!-- 商品信息   -->
    <el-row class="details">
      <el-col :span="15" style="padding-right:20px;">

        <div class="name">
          <span>{{productDetail.title}}</span>
          <span style="float: right;color: #00c9b3;font-size: 12px;cursor: pointer;">食品安全档案</span>
        </div>

        <div class="rate">
          <el-rate
            disabled
            score-template="{value}"
            text-color="#ff9900"
            v-model="productDetail.score"/>
          <span class="comment-number">{{productDetail.score}}分人均￥{{productDetail.avgPrice}}</span>
        </div>

        <div class="address">
          <p>地址：{{productDetail.address}} <a href="/"><i class="el-icon-location"/></a></p>
          <p>电话：{{productDetail.phone}}</p>
          <p>营业时间：{{productDetail.businessTime}}</p>
        </div>

        <ul class="tags">
          <li v-for="(item,index) in productDetail.service" :key="index">
            <img alt="图片" src="http://p0.meituan.net/codeman/551290739062eda37e52999e2315f50c1887.png"/>
            <span>{{item}}</span>
          </li>
        </ul>

      </el-col>

      <el-col :span="9" style="overflow: hidden;cursor: pointer;">
        <div class="big">
          <img alt="图片" src="@/assets/img/map.png"/>
        </div>
        <ul class="img-ul">
          <li><img alt="图片" src="@/assets/img/map.png"/></li>
          <li><img alt="图片" src="@/assets/img/map.png"/></li>
          <li><img alt="图片" src="@/assets/img/map.png"/></li>
          <li><img alt="图片" src="@/assets/img/map.png"/></li>
          <li><img alt="图片" src="@/assets/img/map.png"/></li>
        </ul>
      </el-col>
    </el-row>

    <el-row class="btm-cont">
      <el-col :span="19">
        <!--  商家团购及优惠-->
        <div>
          <h3>商家团购及优惠</h3>
          <div class="deal-need-login">
            <img alt="登录查看"
                 src="//p0.meituan.net/codeman/56a7d5abcb5ce3d90fc91195e5b5856911194.png"/>
            <span>请登录后查看详细团购优惠</span>
            <router-link to="login">
              <button>立即登录</button>
            </router-link>
          </div>
        </div>

        <!--  推荐菜  -->
        <div class="recommend">
          <h3>推荐菜</h3>
          <div class="cont">
            <ul>
              <li>
                <img alt="图片" src="@/assets/img/map.png" style="height: 100%; width: 100%"/>
                <div class="desc">
                  <span class="truncate">烤羔羊肉串</span>
                  <b>￥15</b>
                </div>
              </li>
            </ul>

            <div class="list">
              <span v-for="(item,index) in productDetail.recommend" :key="index">{{item}}</span>
            </div>
          </div>
        </div>

        <!--网友点评-->
        <div class="comment">
          <div class="total">
            <span>{{productDetail.commentNum}}条网友点评</span>
            <div class="sort">
              <span style="color: #00c9b3;margin-right: 20px">质量排序</span>
              <span>时间排序</span>
            </div>

          </div>
          <div class="com-cont">
            <!-- 标签-->
            <ul class="tags">
              <li v-for="(item,index) in productDetail.tab" :key="index">{{item}}</li>
            </ul>

            <div class="sea">
              <span><b/>只看有图片的评论</span>
            </div>

            <el-row class="list" v-for="(item,index) in productDetail.comment" :key="index">
              <el-col :span="2" class="header">
                <img alt="图片" :src="item.image"/>
              </el-col>

              <el-col :span="22" class="info">
                <div class="name">{{item.username}}</div>

                <div class="rate">
                  <el-rate
                    disabled
                    score-template="{value}"
                    text-color="#ff9900"
                    v-model="item.rate"/>
                  <span class="date">2016年5月2日</span>
                </div>

                <div class="desc">{{item.evalaute}}</div>

                <div class="paginatedThumbnails" v-if="item.pics.length!==0">
                  <img v-for="(imgSrc,index) in item.pics" :src="imgSrc" alt="图片" :key="index"/>
                </div>

                <div class="like-cont">
                  <img src="@/assets/img/praise.png"/>
                  <span>赞</span>
                </div>

                <div class="line"></div>

              </el-col>
            </el-row>

          </div>

        </div>

      </el-col>
      <el-col :span="5">
        <Fav style="margin-top: 35px;"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import http from '@/axios/api'
  import Crumbs from '@/components/products/crumbs'
  import Fav from '@/components/products/fav'

  export default {
    name: 'productDetail',
    components: {
      Crumbs,
      Fav,
    },
    created () {
      http.getProductDetail().then(res => {
        // console.log(res)
        this.productDetail = res.data.data
      })
    },
    data () {
      return {
        productDetail: {},
      }
    }
  }
</script>

<style lang="scss">
  .breadcrumbs {
    font-size: 12px;
    color: #222;
    line-height: 17px;
    padding: 19px 0;
  }

  .details {
    font-size: 12px;
    color: #666;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px 20px 33px;
    border: 1px solid #e5e5e5;
    box-shadow: 0 5px 14px 0 rgba(0, 0, 0, .1);

    .name {
      font-size: 26px;
      line-height: 37px;
    }

    .rate {
      font-size: 14px;
      height: 14px;
      margin: 6px 0 17px;

      .el-rate {
        display: inline-block;

        .el-rate__icon {
          font-size: 12px;
        }
      }
    }

    .address {
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
      padding: 16px 0 11px;

      p {
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 10px;
      }
    }

    .tags {
      padding-top: 20px;
      display: flex;

      li {
        margin-right: 16px;
        line-height: 17px;
        list-style: none;
        display: flex;
        flex-direction: column;

        img {
          margin: auto auto 11px;
          width: 24px;
          height: 24px;
          border-radius: 0;
        }
      }
    }

    .big {
      height: 214px;
      width: 100%;
      background: center center no-repeat #e0e0e0;
      background-size: 60% auto;

      img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
    }

    .img-ul {
      padding-top: 10px;
      display: flex;

      li {
        width: 92px;
        margin-right: 4px;
        height: 50px;
        list-style: none;

        image {
          border-radius: 4px;
        }
      }
    }
  }

  .btm-cont {
    color: #222;
    padding-top: 40px;

    h3 {
      font-size: 20px;
      line-height: 26px;
      margin-bottom: 8px;
    }

    .deal-need-login {
      padding: 30px 0;
      margin-bottom: 40px;
      text-align: center;
      background-color: #fff;
      border: 1px solid #e5e5e5;

      image {
        width: 160px;
        height: 120px;
      }

      span {
        display: block;
        margin: 10px 0 14px;
        color: #666;
        font-size: 16px;
        line-height: 26px;
      }

      button {
        padding: 0;
        border-radius: 100px;
        border: none;
        outline: 0;
        text-align: center;
        color: #fff;
        cursor: pointer;
        transition: background .6s ease;
        width: 120px;
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        background-color: #13D1BE;
      }
    }

    .recommend {
      overflow: hidden;
      margin-bottom: 40px;

      .cont {
        border: 1px solid #e5e5e5;
        background-color: #fff;
        padding: 33px 32px 26px;
        border-radius: 4px;

        ul {
          display: flex;

          li {
            width: 130px;
            margin-right: 20px;
            list-style: none;
            position: relative;
            height: 130px;
            border-radius: 4px;

            .desc {
              font-size: 14px;
              width: 100%;
              background: rgba(0, 0, 0, .3);
              padding: 8px 0;
              text-align: center;
              color: #fff;
              position: absolute;
              bottom: 0;
              left: 0;

              span {
                vertical-align: bottom;
                max-width: 60%;
                display: inline-block;
              }

              b {
                font-weight: 400;
              }
            }
          }
        }

        .list {
          padding: 25px 0 0 6px;
          display: flex;
          flex-wrap: wrap;

          span {
            display: block;
            margin: 0 20px 19px 0;
            font-size: 16px;
            line-height: 20px;
            color: #333;
          }
        }
      }
    }

    .comment {
      margin-bottom: 40px;

      .total {
        font-size: 20px;
        line-height: 26px;

        .sort {
          cursor: pointer;
          float: right;
          font-size: 12px;
          color: #999;
        }
      }

      .com-cont {
        margin-top: 8px;
        background: #fff;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        padding: 0 20px 40px;
        color: #666;

        .tags {
          padding-top: 15px;
          display: flex;
          flex-wrap: wrap;

          li {
            font-size: 14px;
            line-height: 34px;
            padding: 0 10px;
            border: 1px solid #e5e5e5;
            border-radius: 2px;
            margin: 0 10px 10px 0;
            cursor: pointer;
            list-style: none;
          }
        }

        .sea {
          margin-top: 22px;
          font-size: 14px;

          span {
            display: inline-block;
            line-height: 20px;
            cursor: pointer;

            b {
              width: 15px;
              height: 15px;
              border-radius: 2px;
              border: 1px solid #ccc;
              display: inline-block;
              vertical-align: text-bottom;
              margin-right: 6px;
            }
          }
        }

        .list {
          padding: 30px 0 0;

          .header {

            img {
              width: 60px;
              height: 60px;
              border-radius: 50%;
            }
          }

          .info {
            padding-left: 20px;

            .name {
              font-size: 16px;
              color: #222;
              line-height: 22px;
              margin-bottom: 1px;
            }

            .rate {
              line-height: 14px;
              margin-top: 3px;
              height: 16px;
              font-size: 11px;

              .el-rate {
                display: inline-block;

                .el-rate__icon {
                  font-size: 12px;
                }
              }

              .date {
                font-size: 12px;
                line-height: 20px;
                color: #999;
                float: right;
              }
            }

            .desc {
              font-size: 14px;
              line-height: 20px;
              padding-top: 13px;
            }

            .paginatedThumbnails{
              display: flex;
              flex-wrap: wrap;
              padding-top: 10px;
              img{
                width: 140px;
                height: 140px;
                margin: 5px;
              }
            }

            .like-cont {
              text-align: right;
              margin: 17px 0 16px;
              font-size: 12px;
              color: #666;

              img {
                width: 20px;
                height: 20px;
                display: inline-block;
                vertical-align: text-bottom;
              }
            }

            .line {
              height: 1px;
              overflow: hidden;
              border-bottom: 1px solid #e5e5e5;
            }

          }
        }
      }
    }
  }

</style>
