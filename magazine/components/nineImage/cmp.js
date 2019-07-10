// components/nineImage/cmp.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        imgArr: {
            type: Array,
            value: [
                'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2908071898,1959862348&fm=26&gp=0.jpg',
                'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1715438941,2477373636&fm=26&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2273147934,256042812&fm=26&gp=0.jpg',
                'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2090463989,4251885924&fm=26&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1784867875,3922691523&fm=26&gp=0.jpg',
                'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2958462336,1035491823&fm=26&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2777223685,277797279&fm=26&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1104965399,1299660779&fm=26&gp=0.jpg',
                'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2843674164,3136347096&fm=26&gp=0.jpg'
            ],
        },
        mainTitle:String,
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
        onTap(e) {
            const index = e.currentTarget.dataset.index;
            const array = this.data.imgArr;
            //在新页面中全屏预览图片。
            wx.previewImage({
                urls: array,
                current: array[index]
            })
        }
    }
})