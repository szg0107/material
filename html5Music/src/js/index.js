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
            bindEvent();
            bindTouch();
        },
        error: function () {
            console.log('error');
        }
    });
}

//事件绑定
function bindEvent() {
    $('body').on('play:change', function (e, index, flag) {
        audio.getAudio(dataList[index].audio);
        root.pro.renderAllTime(dataList[index].duration);
        root.render(dataList[index]);
        $('.img-box').attr('data-deg', 0).css({
            transform: 'rotateZ(' + 0 + 'deg)',
            transaction: 'none'
        });
        if (audio.status === 'play' || flag) {
            rotated(0);
            root.pro.start(0);
            audio.play();
        }else {
            root.pro.update(0);
        }
    });
    $('.prev').on('click', function () {
        let i = nowIndex.prev();
        $('body').trigger('play:change', i);
    });
    $('.next').on('click', function () {
        let i = nowIndex.next();
        $('body').trigger('play:change', i);
    });
    $('.play').on('click', function () {
        if (audio.status === 'pause') {
            let deg = parseInt($('.img-box').attr('data-deg'));
            // console.log(deg);
            rotated(deg);
            audio.play();
            root.pro.start();
        } else {
            clearInterval(timer);
            audio.pause();
            root.pro.stop();
        }
        $('.play').toggleClass('playing');
    });
    $('.list').on('click', function () {
        root.playList.show(nowIndex.index);
    })
}

//绑定拖拽事件
function bindTouch() {
    let left = $('.pro-bottom').offset().left,
        width = $('.pro-bottom').offset().width;
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
    clearInterval(timer);
    timer = setInterval(function () {
        deg += 2;
        // console.log(deg);
        $('.img-box').attr('data-deg', deg).css({
            transform: 'rotateZ(' + deg + 'deg)',
            transaction: 'all 1s ease-out'
        });
    }, 200);
}

//当音乐播放完毕时自动切换到下一首
$(audio.audio).on('ended', function () {
    $('.next').trigger('click');
});

getData('../mock/data.json');