//自定义分页插件
(function ($) {
    function TurnPage(options) {
        //插件父级
        this.wrap = options.wrap;
        //总数条数
        this.allPageSize = options.allPageSize || 1;
        //当前页数
        this.nowPage = options.nowPage || 1;
        //每页展示多少数据
        this.pageSize = options.pageSize || 10;
        //所有页数
        this.allPage = Math.ceil(this.allPageSize / this.pageSize);
        this.changePageCB = options.changePageCB;
        this.init = function () {
            this.createDom();
            this.bindEvent();
        }
    }

    TurnPage.prototype.createDom = function () {
        //父元素清空，重新渲染
        $(this.wrap).empty();
        let oUl = $('<ul class="my-turn-page"></ul>').css({listStyle: 'none', display: 'flex',}),
            oInput = $('<input class="size" type="number" min="1" max="50" value="' + this.pageSize + '" />');
        $('<li class="page-size"><span>每页条数</span></li>').append(oInput).css({border: 0,}).appendTo(oUl);
        //添加上一页按钮
        if (this.nowPage > 1) {
            $('<li class="prev-page">上一页</li>').appendTo(oUl);
        }
        // if (this.nowPage > 3) {
        //     $('<li class="num">1</li>').appendTo(oUl);
        // }
        // 如果当前页不是第一页  并且当前页与第一页之间差2页以及两页以上  添加第一页
        if (this.nowPage !== 1 && this.nowPage - 2 > 1) {
           $('<li class="num">1</li>').appendTo(oUl);
        }
        // 如果当前页的前两页 大于第二页 则出现省略号
        if (this.nowPage - 2 > 2) {
            $('<span>...</span>').appendTo(oUl);
        }
        // 渲染当前页数左右两页
        for (let i = this.nowPage - 2; i <= this.nowPage + 2; i++) {
            /*if (i === this.nowPage) {
                $('<li class="num active">' + i + '</li>').css({
                    backgroundColor: '#428bca',
                    color: '#F0F8FF'
                }).appendTo(oUl);
            } else if (i > 0 && i <= this.allPage) {
                $('<li class="num">' + i + '</li>').appendTo(oUl);
            }*/
            // 当前页要在1-allPage之间
            if(i > 0 && i <= this.allPage) {
                let oli= $('<li class="num">' + i + '</li>');
                if (i === this.nowPage) {
                    oli.css({
                        backgroundColor: '#428bca',
                        color: '#F0F8FF'
                    });
                }
                oli.appendTo(oUl);
            }
        }
       // 当前页数与最后一页之间搁三页及以上出现省略号
        if (this.allPage - this.nowPage > 3) {
            $('<span>...</span>').appendTo(oUl);
        }
        //添加最后一页
        if (this.nowPage + 2 < this.allPage) {
            $('<li class="num">' + this.allPage + '</li>').appendTo(oUl);
        }
        // 添加下一页按钮
        if (this.nowPage < this.allPage) {
            $('<li class="next-page">下一页</li>').appendTo(oUl);
        }
        $(this.wrap).append(oUl);

    };
    TurnPage.prototype.bindEvent = function () {
        let self = this;
        $('.num', this.wrap).on('click', function (e) {
            let page = parseInt($(this).text());
            console.log(page);
            self.changePage(page);
        });
        $('.prev-page', this.wrap).on('click', function (e) {
            if (self.nowPage > 1) {
                self.nowPage--;
                self.changePage(self.nowPage);
            }
        });
        $('.next-page', this.wrap).on('click', function (e) {
            if (self.nowPage < self.allPage) {
                self.nowPage++;
                self.changePage(self.nowPage);
            }
        });
        $('.size', this.wrap).on('change', function (e) {
            self.pageSize = parseInt($(this).val());
            self.allPage = Math.ceil(self.allPageSize / self.pageSize);
            self.changePage(1);
        })
    };
    TurnPage.prototype.changePage = function (page) {
        this.nowPage = page;
        this.createDom();
        this.bindEvent();
        this.changePageCB && this.changePageCB({
            nowPage: this.nowPage,
            pageSize: this.pageSize,
        });
    };

    $.fn.extend({
        page: function (options) {
            options.wrap = this;
            let pageObj = new TurnPage(options);
            pageObj.init();
            return this;
        }
    })
}(jQuery));//传入jQuery 每次调用jQuery就不需要从上文中去找了，从形参上找就可以了