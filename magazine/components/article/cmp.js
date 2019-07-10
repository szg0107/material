// 文章组件
import {LikeModel} from "../../models/like.js"

const likeModel = new LikeModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //文章详情
    articleDetail: Object,
    // judgeData: {
    //   type: String,
    //   value: '',
    //   observer: 'getLikeStatus'
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //喜欢状态
    likeStatus: false
  },

  attached() {
    // this.getLikeStatus()

    // const articleDetail = this.data.articleDetail
      // const artId = articleDetail.artId
      // const likeStatus =  likeModel.getLikeStatus(artId)

      // this.setData({
      //   likeStatus
      // })
  },


  /**
   * 组件的方法列表
   */
  methods: {
    onLike(e) {
            //喜欢状态
      const like = e.detail.like,
            //文章详情
            articleDetail = this.data.articleDetail,
            //文章id
            artId = articleDetail.artId

      if(like) {
        // 缓存文章
        likeModel.addLikeList(articleDetail)

      } else {
        // 将文章从缓存中移出
        likeModel.removeLikeList(artId)
      }

      // this.resetPageInfo()
    },

    resetPageInfo() {
      // const curPages =  getCurrentPages()[getCurrentPages().length - 1];
      
      // if( curPages.route === "pages/mark/mark"){
      //   curPages.getMyLike()
      // }

      // this.getLikeStatus()
      
    },

    getLikeStatus() {
      // const articleDetail = this.data.articleDetail
      // const artId = articleDetail.artId
      // const likeStatus =  likeModel.getLikeStatus(artId)

      // this.setData({
      //   likeStatus
      // })

    }

  }
})




