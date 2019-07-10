// components/articleList/cmp.js
import {IndexModel} from "../../models/index";
import { SearchModel } from '../../models/search';
const indexModel = new IndexModel();
const searchModel = new SearchModel();
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        //文章列表
        articleList: Array,
        //加载更多信息
        more: {
            type: String,
            value: '',
            observer: 'loadMore',
        },
        //文章id
        magazineId: {
            type:Number,
            value:0,
            observer: 'hasMoreData',
        },
        word: String,
    },

    /**
     * 组件的初始数据
     */
    data: {
        loading: false,
        noMoreData:false,
        type:''
    },

    attached(){
        // 获取页面信息
        const curPages = getCurrentPages(),
              index = curPages.length-1;
        /*if (curPages[index].route ==='pages/search/search'){
            
        }else{

        }*/
        let type=curPages[index].route === 'pages/search/search'?'search':'index';
        this.setData({type});
        
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 加载更多
        loadMore() {
            if (this.data.loading || this.data.noMoreData) {
                return
            }
            this.setData({
                loading: true,
            })
            this.getMoreDta();
        },
        //将请求回来的数据拼接到当前数据之后
        setMoreData(list) {
            const articleList = this.data.articleList.concat(list);
            if (articleList.length !== this.data.articleList.length) {
                this.setData({
                    articleList: articleList,
                    loading: false,
                });
            }else{
                this.setData({
                    noMoreData: true,
                }); 
            }

        },
        //获取更多数据
        getMoreDta(){
            const start = this.data.articleList.length;
            let getMore=null;
            if (this.data.type === 'search') {
                const word = this.data.word;
                getMore = searchModel.getSearchArticleList(word, start);
            } else {
                //获取杂志id和开始位置
                const magazineId = this.data.magazineId;
                //查询文章列表
                getMore = indexModel.getIndexArticleList(magazineId, start);
            }

            getMore.then(res => {
                // console.log(res);
                //将请求回来的数据拼接到当前数据之后
                this.setMoreData(res);
            })
        },
        //当标签切换是重置加载更多
        hasMoreData() {
            this.setData({
                noMoreData: false,
                loading:false
            })
        },
    }
})