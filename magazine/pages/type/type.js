// pages/type/type.js
let myajax=require('../../utils/request.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(options);
        this.getData(options.typeId);   

    },
    //获取数据
    getData:function(typeId){
        let that = this;
        //获取类型及图片 仅支持 1男性穿搭 2人生整理术 3读书
        myajax('getArticleTypeTitleInfo/' + typeId, function (data) {
            // console.log(data);
            that.setData({
                mark: data,
            });
        });
        //请求某一类型文章列表 仅支持 1男性穿搭 2人生整理术 3读书
        myajax('getArticleTypeList/' + typeId, function (data) {
            // console.log(data);
            that.setData({
                articleTypeList: data,
            });
        });
    },
    //显示操作菜单
    showActionSheet: (e) => {
        //接收行间传递参数 currentTarget事件绑定的当前组件 target触发事件的原组件
        // console.log(e);
        let type = e.currentTarget.dataset.articletype;
        //显示操作菜单
        wx.showActionSheet({
            itemList: ['内容过期了', '内容和' + type + '不相关', '不再显示来自' + type + '的内容'],
            success: (res) => {
                console.log(res.tapIndex);
            },
        });
    },

    //喜欢按钮点击事件
    likeClick: function (e) {
        let index = e.currentTarget.dataset.articleindex,
            mylikeList = this.data.likeList;
        mylikeList[index] = !mylikeList[index];
        this.setData({
            likeList: mylikeList,
        });
        // 异步缓存数据比较快，可能会造成不可预知的错误，所以能使同步就使同步
        // 数据存储生命周期跟小程序本身一致，即除用户主动删除或超过一定时间被自动清理，否则数据都一直可用。单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB。
        wx.setStorageSync('likeList', mylikeList);
    },

    //详情跳转
    articleDetails:function(e){
        let articleId = e.currentTarget.dataset.articleid;
        // console.log(articleId);
        wx.navigateTo({
            url: '../articleDetail/articleDetail?articleId=' + articleId,
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})