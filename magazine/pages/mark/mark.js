// pages/mark/mark.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息
    userInfo: {},
    //用户是否授权
    authorized: false,
    //喜欢列表
    likeList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized()
  },

  onShow() {
    this.getMyLike()
  },

  onPullDownRefresh() {
    this.getMyLike()
  },

  onGetUserInfo(e) {

    const userInfo = e.detail.userInfo

    if(userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })

      this.getMyLike()
    }

  },

  getMyLike() {
    const likeList = wx.getStorageSync('likeList') || []
    
    this.setData({
      likeList
    })

  },
 //用户授权
  userAuthorized() {
    wx.getSetting({
      success: res => {
        if(res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {

              this.setData({
                userInfo: res.userInfo,
                authorized: true
              })

              this.getMyLike()
            }
          })
        }
      }
    })
  }
})