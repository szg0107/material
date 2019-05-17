//轮播图JQuery插件
(function () {
    //创建轮播图对象
    function Slider(options) {
        // 存储添加轮播图区域的dom元素
        this.wrap = options.wrap;
        // 存储要添加的图片数据
        this.imgList = options.imgList;
        // 存储展示图片的宽度
        this.showImgWidth = options.showImgWidth || $(this.wrap).width();
        //图片数量
        // this.imgNum = this.imgList.length;
        // 存储展示区域的宽度
        this.width = options.width || $(this.wrap).width();
        // 存储展示区域的高度
        this.height = options.height || $(this.wrap).height();
        // 存储轮播页数
        this.imgNum = Math.floor(this.imgList.length * this.showImgWidth / this.width);
        // 存储当前轮播的页数
        this.nowIndex = 0;
        // 当前动画是否结束  锁
        this.flag = false;
        // 轮播动画类型   fade为淡入淡出效果   animate为正常轮播效果
        this.animateType = options.animateType || 'animate';
        // 是否自动轮播
        this.isAuto = options.isAuto || true;
        //轮播方向
        this.direction = options.direction || 'right';
        //展示速度
        this.speed = options.speed || 2000;
        //显示圆点
        this.showDot = typeof options.showDot === 'undefined' ? true : options.showDot;
        //创建dom样式
        this.createDom();
        // 初始化样式
        this.initStyle();
        // 绑定事件
        this.bindEvent();
        // 自动轮播
        if (this.isAuto) {
            this.autoMove(this.speed);
        }
    }

    //创建dom
    Slider.prototype.createDom = function () {
        let oUl = $('<ul class="slider"></ul>'),
            leftBtn = $('<div class="left-btn">&lt;</div>'),
            rightBtn = $('<div class="right-btn">&gt;</div>'),
            //小圆点
            oSpot = $('<div class="spot"></div>');
        // 添加图片元素
        this.imgList.forEach(function (item, index) {
            let oLi = $('<li><a href="#"><img  src= ' + item + '></a></li>');
            oLi.appendTo(oUl);
        });
        if (this.animateType === 'animate') {
            // 每页的图片数量
            let num = Math.floor(this.width / this.showImgWidth);
            for (let i = 0; i < num; i++) {
                let oLi = $('<li><a href="#"><img src=' + this.imgList[i] + '></a></li>');
                oUl.append(oLi);
            }
        }
        if (this.showImgWidth <= this.width) {
            for (let i = 0; i < this.imgNum; i++) {
                let oSpan = $('<span></span>');
                oSpan.appendTo(oSpot);
            }
        }

        if (this.showDot) {
            $(this.wrap).append(oUl).append(leftBtn).append(rightBtn).append(oSpot);
        } else {
            $(this.wrap).append(oUl).append(leftBtn).append(rightBtn);
        }

    };

    // 初始化样式
    Slider.prototype.initStyle = function () {
        // 为轮播图内部标签初始化样式  默认样式清除
        $('*', this.wrap).css({
            margin: 0,
            padding: 0,
            listStyle: 'none',
        });
        // 为父元素设置初始化样式超出部分隐藏
        $(this.wrap).css({
            overflow: 'hidden',
            position: 'relative',
        });
        // 为ul添加宽度
        $('.slider', this.wrap).css({
            overflow: 'hidden',
            position: 'relative',
            width: this.animateType === 'animate' ? this.width * (this.imgNum + 1) : this.width,
            height: this.height,
        });
        // 图片变成一行
        if (this.animateType === 'animate') {
            $('.slider > li', this.wrap).css({
                width: this.showImgWidth,
                height: this.height,
                float: 'left',
            });
        } else if (this.animateType === 'fade') {
            $('.slider > li', this.wrap).css({
                width: this.showImgWidth,
                height: this.height,
                position: 'absolute',
                display: 'none',
            }).eq(this.nowIndex).css({
                display: 'block',
            });
        }

        // 设置图片的大小
        $('.slider > li a, .slider> li a img', this.wrap).css({
            display: 'inline-block',
            width: this.showImgWidth,
            height: this.height,
        });
        // 设置左右按钮的样式
        $('.left-btn, .right-btn', this.wrap).css({
            position: 'absolute',
            width: 50,
            height: 30,
            lineHeight: '30px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: '#fff',
            top: '50%',
            marginTop: -15,
            textAlign: 'center',
            fontWeight: 'bold',
            cursor: 'pointer',
        });
        $('.right-btn', this.wrap).css({
            right: 0
        });
        // 设置小圆点的位置
        $('.spot', this.wrap).css({
            position: 'absolute',
            bottom: 10,
            left: "50%",
            marginLeft: -(16 * this.imgNum / 2),
        });
        // 设置小圆点的样式
        $('.spot > span', this.wrap).css({
            float: 'left',
            width: 10,
            height: 10,
            margin: 3,
            backgroundColor: "#fff",
            borderRadius: '50%',
            cursor: 'pointer',
        }).eq(this.nowIndex).css({
            backgroundColor: 'red'
        })
    };

    //绑定事件
    Slider.prototype.bindEvent = function () {
        let self = this;
        $('.left-btn', this.wrap).on('click', function (e) {
            self.move('prev');
        });
        $('.right-btn', this.wrap).on('click', function (e) {
            self.move('next');
        });
        $('.spot span', this.wrap).on('click', function (e) {
            self.move($(this).index());
        });
        // 自动播放判断
        $(this.wrap).mouseenter(function () {
            clearInterval(self.timer);
        }).mouseleave(function () {
            if (self.isAuto) {
                self.autoMove(self.speed);
            }
        });
    };

    //图片移动
    Slider.prototype.move = function (dir) {
        // 判断上一次动画是否结束 如果没有结束 则不进行下次动画
        if (this.flag) {
            return false;
        }
        // 如果已经结束 可以继续下一次动画  并且将锁锁住
        this.flag = true;
        // 判断运动方向
        switch (dir) {
            // 前一页
            case 'prev':
                // 如果当前页索引值为0 则前一页应该为最后一页 即imgNum - 1
                if (this.nowIndex === 0) {
                    // 如果轮播动画为animate  则要将图片的位置置为最后一页图片的位置  为了使动画效果展现成从第一张向前到最后一张过度的效果 而不经过中间几张图片
                    if (this.animateType === 'animate') {
                        $('.slider', this.wrap).css({
                            left: -this.imgNum * this.width,
                        });
                    }
                    this.nowIndex = this.imgNum - 1;
                } else {
                    // 如果索引值不是0 则索引值-1
                    this.nowIndex--;
                }
                break;
            // 向后
            case 'next':
                // 如果动画类型为淡入淡出的类型  且当前页为最后一页 则将索引值置为0
                if (this.animateType === 'fade' && this.nowIndex === this.imgNum - 1) {
                    this.nowIndex = 0;
                    // 如果动画类型为animate 并且当前页为最后一页（展现出来的使第一页的效果）则要让ul的位置瞬间移动到第0号索引值的位置 在进行轮播
                } else if (this.animateType === 'animate' && this.nowIndex === this.imgNum) {
                    // 该步骤的目的是是效果显示为最后一张过渡到第一张的效果
                    this.nowIndex = 0;
                    $('.slider', this.wrap).css({
                        left: 0
                    });
                    this.nowIndex++;
                    // 如果当前页不是最后一页 则将索引值+1
                } else {
                    this.nowIndex++;
                }
                break;
            // 如果传入的是索引值 则将页码置为当前索引值
            default:
                this.nowIndex = dir;
                break;
        }
        // 改变图片样式
        let self = this;
        // 如果是淡入淡出效果  则添加淡入淡出动画
        if (this.animateType === 'fade') {
            $('.slider > li', this.wrap).fadeOut().eq(this.nowIndex).fadeIn(500, function () {
                self.flag = false;
            });
            // 如果是animate效果   则添加animate动画效果
        } else if (this.animateType === 'animate') {
            $('.slider', self.wrap).animate({
                left: -this.width * this.nowIndex,
            }, function () {
                // 动画完成之后 解锁
                self.flag = false;
            });
        }
        // 切换小圆点样式
        $('.spot > span', this.wrap).css({
            backgroundColor: '#fff'
        }).eq(this.nowIndex % this.imgNum, this.wrap).css({
            backgroundColor: 'red',
        });
    };

    //自动轮播
    Slider.prototype.autoMove = function (time) {
        let self = this;
        this.timer = setInterval(function () {
            self.direction === 'right' ? self.move('next') : self.move('prev');
        }, time);
    };

    $.fn.extend({
        slider: function (options) {
            //保存插入轮播图的位置(轮播图的父级)
            options.wrap = this;
            //构建轮播图对象
            new Slider(options);
        }
    });
}());