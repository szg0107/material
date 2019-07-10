class LikeModel {
    //设置喜欢列表
    setLikeList (value) {
        wx.setStorageSync('likeList', value);
    }
    //获取喜欢列表
    getLikeList () {
        return wx.getStorageSync('likeList') || [];
    }
    //添加喜欢列表
    addLikeList (articleDetail) {
        const likeList = this.getLikeList();
        //将喜欢的文章添加到数组第一个
        likeList.unshift(articleDetail);
        this.setLikeList(likeList);
    }
    //移除喜欢列表
    removeLikeList (artId) {
        const likeList = this.getLikeList();
        let myIndex = 0;

        likeList.forEach( (item, index) => {
            if(item.artId === artId) {
                myIndex = index
                return
            }
        } );
        //删除数组中某个值
        likeList.splice(myIndex, 1)

        this.setLikeList(likeList);
    }

    //获取喜欢状态
    getLikeStatus (artId) {
        const likeList = this.getLikeList()
        let likeStatus = false

        likeList.forEach( (item, index) => {
            if(item.artId === artId) {
                likeStatus = true
            }
        } )

        return likeStatus
    }
}

export {LikeModel}