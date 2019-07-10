(function ($, root) {
    let duration = 0,
        frameId = null,
        startTime = null,
        lastPer = 0;

    //格式化时间 将 秒 ---》分 : 秒
    function formatTime(time) {
        time = Math.round(time);
        //分
        let minute = Math.floor(time / 60),
            //秒
            second = time - minute * 60;
        if (minute < 10) {
            minute = '0' + minute;
        }
        if (second < 10) {
            second = '0' + second;
        }
        return minute + ':' + second;
    }

    // 渲染总时间
    function renderAllTime(time) {
        duration = time;
        time = formatTime(time);
        //  切换歌曲需要初始化上一段播放进度
        lastPer = 0;
        $('.all-time').html(time);
    }

    //开始滚动
    function start(percentage) {
        lastPer = percentage === undefined ? lastPer : percentage;
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();

        function frame() {
            //当前时间
            let curTime = new Date().getTime(),
                // 当前歌曲播放的总进度 = 上一段的进度 + 当前段的进度
                percent = lastPer + (curTime - startTime) / (duration * 1000);
            if (percent < 1) {
                //不明白这一段是干嘛的
                frameId = requestAnimationFrame(frame);
                update(percent);
            } else {
                //不明白这一段是干嘛的
                cancelAnimationFrame(frameId);
                $('body').find(".next-btn").trigger("click");
            }
        }

        frame()
    }

    //停止滚动
    function stop() {
        cancelAnimationFrame(frameId);
        let curTime = new Date().getTime(),
            per = (curTime - startTime) / (duration * 1000);
        lastPer += per;
    }
    //更新滚动条+更新时间
    function update(percent){
        let curTime = percent * duration,
            translateX = (percent - 1) * 100 + '%';
        curTime = formatTime(curTime);
        $('.cur-time').html(curTime);
        $('.pro-top').css({
            transform: 'translateX(' + translateX + ')',
        });
    }
    root.pro = {
        renderAllTime: renderAllTime,
        start: start,
        stop: stop,
        update: update
    }
}(window.Zepto, window.player || (window.player = {})));