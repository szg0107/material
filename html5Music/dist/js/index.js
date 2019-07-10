let root = window.player,
    //角标对象
    nowIndex = {},
    //数据
    dataList = [],
    //数据长度
    len = 0,
    //音频播放器
    audio = root.audioManager,
    //图片旋转定时器
    timer = 0;


//获取数据
function getData(url) {
    $.ajax({
        type: 'get',
        url: url,
        success: function (data) {
            // console.log(data);
            //获取数据
            dataList = data;
            //获取数据长度
            len = dataList.length;
            //初始化index对象获取角标和长度
            nowIndex = new root.index(len);
            //渲染页面
            root.render(data[0]);
            //渲染播放列表
            root.playList.renderList(data);
            //渲染进度条
            root.pro.renderAllTime(data[0].duration);
            //加载第一个音频但不播放
            audio.getAudio(dataList[0].audio);
            //绑定点击事件
            bindEvent();
            //进度条拖拽事件
            bindTouch();
        },
        error: function () {
            console.log('error');
        }
    });
}

//事件绑定
function bindEvent() {
    //body 自定义事件
    $('body').on('play:change', function (e, index, flag) {
        //获取音频地址
        audio.getAudio(dataList[index].audio);
        //获取音频所有时间
        root.pro.renderAllTime(dataList[index].duration);
        //根据音频信息渲染页面
        root.render(dataList[index]);
        //初始化图片旋转角度，及过度属性
        $('.img-box').attr('data-deg', 0).css({
            transform: 'rotateZ(' + 0 + 'deg)',
            transaction: 'none'
        });
        //如果是播放就开始旋转、播放 否则更新进度条
        if (audio.status === 'play' || flag) {
            rotated(0);
            root.pro.start(0);
            audio.play();
        } else {
            root.pro.update(0);
        }
    });

    //上一首点击事件
    $('.prev').on('click', function () {
        //获取上一首歌的索引
        let i = nowIndex.prev();
        //调用body上的自定义方法
        $('body').trigger('play:change', i);
    });

    //下一首点击事件
    $('.next').on('click', function () {
        //获取下一首歌的索引
        let i = nowIndex.next();
        //调用body上的自定义方法
        $('body').trigger('play:change', i);
    });

    //播放按钮点击事件
    $('.play').on('click', function () {
        //如果播放状态是暂停
        if (audio.status === 'pause') {
            //获取图片上的data-deg属性 拿到旋转角度
            let deg = parseInt($('.img-box').attr('data-deg'));
            // console.log(deg);
            //将获取的角度传入旋转方法中
            rotated(deg);
            //音乐播放
            audio.play();
            //进度条开始
            root.pro.start();
        } else {
            //清除旋转定时器
            clearInterval(timer);
            //音乐暂停
            audio.pause();
            //进度条停止
            root.pro.stop();
        }
        //播放按钮移除playing类
        $('.play').toggleClass('playing');
    });

    //播放列表点击事件
    $('.list').on('click', function () {
        //当播放列表按钮被点击时，显示播放列表并将当前歌曲索引传入
        root.playList.show(nowIndex.index);
    })
}

//绑定拖拽事件
function bindTouch() {
    let $proBottom = $('.pro-bottom'),
        left = $proBottom.offset().left,
        width = $proBottom.offset().width;
    //绑定拖拽事件 开始拖拽 ： 取消进度条渲染
    $('.slider').on('touchstart', function () {
        root.pro.stop();
    }).on('touchmove', function (e) {
        //计算拖拽的百分比 更新我们的当前时间和进度条
        let x = e.changedTouches[0].clientX,
            percent = (x - left) / width;
        if (percent > 1 || percent < 0) {
            percent = 0;
        }
        root.pro.update(percent);
    }).on('touchend', function (e) {
        //计算百分百 跳转播放 重新开始进度条渲染
        let x = e.changedTouches[0].clientX,
            percent = (x - left) / width;
        if (percent > 1 || percent < 0) {
            percent = 0;
        }
        let curDuration = dataList[nowIndex.index].duration,
            curTime = curDuration * percent;
        audio.playTo(curTime);
        root.pro.start(percent);
        $('body').find('.play-btn').addClass('playing');
    })
}

//音乐图片旋转
function rotated(deg) {
    //清除定时器
    clearInterval(timer);
    timer = setInterval(function () {
        //每0.2秒旋转角度加2
        deg += 2;
        //保证旋转角度在0~360度范围
        deg = deg % 360;
        // console.log(deg);
        //设置图片数据角度属性；设置旋转角度及动画方式
        $('.img-box').attr('data-deg', deg).css({
            transform: 'rotateZ(' + deg + 'deg)',
            transaction: 'all 1s ease-out'
        });
    }, 200);
}

//当音乐播放完毕时自动切换到下一首
$(audio.audio).on('ended', function () {
    //触发下一首按钮默认点击事件
    $('.next').trigger('click');
});

//获取数据
getData('../mock/data.json');