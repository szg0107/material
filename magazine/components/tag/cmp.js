// components/tag/cmp.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tag: String,
        tagId: Number,
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onTap() {
            /*const tagId = this.properties.tagId;
            wx.navigateTo({
                //${tagId}es6字符串模板形式
                url: 'pages/type/type?tagId=${tagId}',
            })*/
            this._showError();
        },
        _showError() {
            wx.showToast({
                title: '当前小程序为测试版本，不能点击跳转',
                duration: 1000,
                icon:'none',
                mask: true,
            })
        }
    }
})