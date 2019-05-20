//实现页面渲染 img+info+like-btn
(function ($, root) {
    function renderImg(src) {
        let img = new Image();
        img.src = src;
        img.onload = function () {
            $('.img-box img').attr('src', src);
            root.blurImg(img, $('body'));
        };
    }

    function renderInfo(info) {
        let str = '<div class="song-name">' + info.song + '</div>\
            <div class="singer-name">' + info.singer + '</div>\
            <div class="album-name">' + info.album + '</div>';
        $('.song-info').html(str);
    }

    function renderIsLike(like) {
        let likeDom = $('.like');
        like ? likeDom.addClass('liking') : likeDom.removeClass('liking');
    }

    root.render = function (data) {
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
    }
}(window.Zepto, window.player || (window.player = {})));