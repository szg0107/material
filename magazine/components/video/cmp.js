// components/video/cmp.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        videoSrc: {
            type: String,
            value: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
        },
        poster: {
            type: String,
            value: 'http://img95.699pic.com/photo/40136/6964.gif_wh300.gif',
        },
        duration: {
            type: String,
            value: '41\'',
        },
        mainTitle: {
            type: String,
            value: '阿斯顿撒大所多所多',
        },
        videoId: {
            type: String,
            value: 'myVideo',
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        //显示封面图
        showPoster: true,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        playOrStop() {
            const myVideo = wx.createVideoContext(this.properties.videoId, this);
            this.setData({
                showPoster: !this.data.showPoster,
            });
            if (this.data.showPoster){
                //开发者工具不从头开始播放真机上没事
                myVideo.seek(0);
                myVideo.stop();
            }else{
                myVideo.play();
            }
        },
        videoEnded(){
            this.setData({
                showPoster: !this.data.showPoster,
            });
        }
    }
})