(function ($, root) {
    function Control(len) {
        this.index = 0;
        this.len = len;
    }

    Control.prototype = {
        prev: function () {
            return this.getIndex(-1);
        },
        next: function () {
            return this.getIndex(1);
        },
        //计算改变后的索引
        getIndex: function (val) {
            let curIndex = (this.index + val + this.len) % this.len;
            this.index = curIndex;
            return curIndex;
        }
    };
    root.index = Control;
}(window.Zepto, window.player || (window.player = {})));