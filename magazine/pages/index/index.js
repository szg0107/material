//index.js
//引用IndexModel
import { IndexModel } from "../../models/index";
import { random } from '../../utils/randomStr.js';
const indexModel = new IndexModel();

Page({
    data: {
        //文章列表
        articleList:[], 
        //类型列表
        markTypeList:[],
        //推荐详情
        recommendInfo:{},
        //上拉加载更多字符串
        getMore:'',
        //杂志id
        magazineId:0,
        //是否加载
        loading:true,
    },

    onLoad: function() {
        this.getData();
        //显示加载遮罩
        // wx.showLoading();
    },
    //导航点击事件
    onNav(e){
        // console.log(e);
        //获取杂志类型id
        const magazineId = e.detail.index;
        //初始化数据
        this.setData({
            magazineId,
            articleList: [],
            //类型列表
            markTypeList: [],
            //推荐详情
            recommendInfo: {},
        });
        //回到页面顶端
        wx.pageScrollTo({
            scrollTop: 0,
            duration:0,
        })
        //查询数据
        this.getData(magazineId);

    },
    //当滚动到底时触发的事件
    onReachBottom() {
        this.setData({
            getMore: random(20),
        })

    },
    //获取数据
    getData(magazineId) {
        Promise.all([indexModel.getIndexArticleList(magazineId), indexModel.getMarkTypeList(magazineId), indexModel.getRecommendInfo(magazineId)]).then(res => {
            // console.log(res);
            this.setData({
                articleList:res[0],
                markTypeList:res[1],
                recommendInfo:res[2],
                loading:false,
            });
            // console.log(this.data.articleList);
            // wx.hideLoading();
        });
    },
    //跳转
    onCatalog(){
        wx.switchTab({
            url: "/pages/catalog/catalog"
        })
    },
})