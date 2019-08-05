//每日一句
const evertDay = new Vue({
        el: '#every_day',
        data: {
            content: 'True happiness is of a retired nature, and an enemy to pomp and noise.',
        },
        computed: {
            getContent: function () {
                return this.content;
            }
        },
        created: function () {
            //请求数据
            axios({
                method: 'get',
                url: '/queryEveryDay',
            }).then((res) => {
                // console.log(res.data.data[0].content);
                this.content = res.data.data[0].content;
            }).catch(() => {
                console.log('请求失败');
            });
        }
    }),
//文章列表
    articleList = new Vue({
        el: '#article_list',
        data: {
            page: 1,
            pageSize: 5,
            count: 100,
            articleList: [
                {
                    title: '初烧盲狙一条铁三角e40',
                    content: ' 木耳，以前也就买个百元左右的耳机，mx160、JBLj02b、mx375，听个响，感觉还不错，之后常年用earpods小白兔，动次打次，佩戴也超级舒服。趁着这次618，入了一条日版铁三角e40。一个方形很有质感的包装盒，宽高还没一个移动硬盘大。官配一共4对耳套，一个6.35mm转接头，店家送的哥套和C套。自带的硅胶套和哥套都感觉不舒服容易掉（可能刚拿到耳机不熟练戴），最终换的C套舒服多了，低频也强了....',
                    date: '2018-08-02 ',
                    views: '8,340',
                    tags: 'e40',
                    id: 1,
                    link: ''
                },
                {
                    title: '初烧盲狙一条铁三角e40',
                    content: ' 木耳，以前也就买个百元左右的耳机，mx160、JBLj02b、mx375，听个响，感觉还不错，之后常年用earpods小白兔，动次打次，佩戴也超级舒服。趁着这次618，入了一条日版铁三角e40。一个方形很有质感的包装盒，宽高还没一个移动硬盘大。官配一共4对耳套，一个6.35mm转接头，店家送的哥套和C套。自带的硅胶套和哥套都感觉不舒服容易掉（可能刚拿到耳机不熟练戴），最终换的C套舒服多了，低频也强了....',
                    date: '2018-08-02 ',
                    views: '8,340',
                    tags: 'e40',
                    id: 2,
                    link: ''
                },
                {
                    title: '初烧盲狙一条铁三角e40',
                    content: ' 木耳，以前也就买个百元左右的耳机，mx160、JBLj02b、mx375，听个响，感觉还不错，之后常年用earpods小白兔，动次打次，佩戴也超级舒服。趁着这次618，入了一条日版铁三角e40。一个方形很有质感的包装盒，宽高还没一个移动硬盘大。官配一共4对耳套，一个6.35mm转接头，店家送的哥套和C套。自带的硅胶套和哥套都感觉不舒服容易掉（可能刚拿到耳机不熟练戴），最终换的C套舒服多了，低频也强了....',
                    date: '2018-08-02 ',
                    views: '8,340',
                    tags: 'e40',
                    id: 3,
                    link: ''
                }
            ],
            pageNumList: [],
        },
        computed: {
            //获取文章列表
            getPage: function () {
                return function (page, pageSize) {
                    const tagId = getQueryString('tagId');
                    if (tagId === null) {
                        //分页查询文章
                        axios({
                            method: 'get',
                            url: `/queryBlogByPage?page=${(page - 1)}&pageSize=${pageSize}`,
                        }).then((res) => {
                            // console.log(res);
                            this.articleList = res.data.data;
                            this.page = page;
                        }).catch(() => {
                            console.log('请求错误');
                        });

                        //查询文章总数
                        axios({
                            method: 'get',
                            url: `/queryBlogCount`,
                        }).then((res) => {
                            // console.log(res);
                            this.count = res.data.data[0].count;
                            this.generatePageTool();
                        }).catch(() => {
                            console.log('查询文章总数请求错误');
                        });

                    } else {
                        //分页查询文章
                        axios({
                            method: 'post',
                            url: `/queryBlogByTag`,
                            data: {
                                page: (page - 1),
                                pageSize: pageSize,
                                tagId: tagId
                            }
                        }).then((res) => {
                            // console.log(res);
                            this.articleList = res.data.data;
                            this.page = page;
                        }).catch(() => {
                            console.log('请求错误');
                        });
                        //查询文章总数
                        axios({
                            method: 'post',
                            url: `/queryBlogByTagCount`,
                            data:{
                                tagId: tagId
                            }
                        }).then((res) => {
                            // console.log(res);
                            this.count = res.data.data[0].count;
                            this.generatePageTool();
                        }).catch(() => {
                            console.log('查询文章总数请求错误');
                        });
                    }
                }
            },
            //生成页面工具
            generatePageTool: function () {
                return function () {
                    let nowPage = this.page,
                        pageSize = this.pageSize,
                        totalCount = this.count,
                        result = [];
                    result.push({text: '上一页', page: 1});
                    //往前显示两个
                    if (nowPage > 2) {
                        result.push({text: nowPage - 2, page: nowPage - 2});
                    }
                    if (nowPage > 1) {
                        result.push({text: nowPage - 1, page: nowPage - 1});
                    }
                    //当前页
                    result.push({text: nowPage, page: nowPage});
                    //是不是最后一页
                    if (nowPage + 1 <= Math.ceil((totalCount + pageSize - 1) / pageSize)) {
                        result.push({text: nowPage + 1, page: nowPage + 1});
                    }
                    if (nowPage + 2 <= Math.ceil((totalCount + pageSize - 1) / pageSize)) {
                        result.push({text: nowPage + 2, page: nowPage + 2});
                    }
                    result.push({text: '下一页', page: Math.ceil((totalCount + pageSize - 1) / pageSize)});
                    this.pageNumList = result;
                }
            },
            //分页跳转
            jumpTo: function () {
                return function (page) {
                    this.getPage(page, this.pageSize);
                }
            }
        },
        created: function () {
            //请求数据
            this.getPage(this.page, this.pageSize);
        }
    });
