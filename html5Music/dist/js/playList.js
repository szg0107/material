(function ($, root) {
    let $playList = $("<div class = 'play-list'>" +
        "<div class='play-header'>播放列表</div>" +
        "<ul class = 'list-wrapper'></ul>" +
        "<div class='close-btn'>关闭</div>" +
        "</div>");

    //渲染播放列表
    function renderList(songList) {
        let html = '';
        for (let i = 0; i < songList.length; i++) {
            html += '<li><h3 >' + songList[i].song + '-<span>' + songList[i].singer + '</span></h3></li>';
        }
        $playList.find('ul').html(html);
        $('body').append($playList);
        bindEvent();
    }

    //显示播放列表
    function show(index) {
        $playList.addClass('show');
        $playList.find('.sign').removeClass('sign');
        $playList.find('ul li').eq(index).addClass('sign');
    }

    //绑定事件
    function bindEvent() {
        $playList.on('click', '.close-btn', function () {
            $playList.removeClass('show')
        });
        $playList.find('li').on('click', function () {
            let index = $(this).index();
            nowIndex.index=index;
            $playList.find('.sign').removeClass('sign');
            $playList.find('ul li').eq(index).addClass('sign');
            $('body').trigger('play:change', [index,true]).find('.play-btn').addClass('playing');
            setTimeout(function () {
                $playList.removeClass('show')
            }, 200);
        })
    }


    root.playList = {
        renderList: renderList,
        show: show
    }
}(window.Zepto, window.player || (window.player = {})));