
// 立即执行函数封闭作用域
(function ($) {
    // 入口函数  接收参数为扩展插件父级及参数
    function init(dom, args) {
        // 如果当前显示页数小于总页数
        if (args.current <= args.pageCount) {
            // 填充html页面内容
            fillHtml(dom, args);
            // 绑定事件
            bindEvent(dom, args);
        } else {
            alert('请输入正确页数')
        }
    }
    function fillHtml(dom, args) {
        // 清空dom元素
        dom.empty();
        //上一页
        if (args.current > 1) {
            dom.append('<a href = "#" class="prevPage">上一页</a>');
        } else {
            dom.remove('.prevPage');
            dom.append('<span class="disabled">上一页</span>');
        }
        //中间页数
        if (args.current !== 1 && args.current >= 4 && args.pageCount !== 4) {
            dom.append('<a href = "#" class="tcdNumber">' + 1 + '</a>');
        }
        if (args.current - 2 > 2 && args.current <= args.pageCount && args.pageCount > 5) {
            dom.append('<span>...</span>');
        }
        // 中间页数利用循环生成
        let start = args.current - 2;
        let end = args.current + 2;
        for (; start <= end; start++) {
            if (start <= args.pageCount && start >= 1) {
                if (start !== args.current) {
                    dom.append('<a href = "#" class="tcdNumber">' + start + '</a>');
                } else {
                    dom.append('<span class="current">' + start + '</span>');
                }
            }
        }
        // 判断临界值插入省略号
        if (args.current + 2 < args.pageCount - 1 && args.pageCount > 5) {
            dom.append('<span>...</span>')
        }
        // 将中间数值插入html内容中
        if (args.current !== args.pageCount && args.current < args.pageCount - 2 && args.pageCount !== 4) {
            dom.append('<a href="#" class="tcdNumber">' + args.pageCount + '</a>');
        }
        //下一页  根据当前页数确定按钮显示状态
        if (args.current < args.pageCount) {
            dom.append('<a href = "#" class="nextPage">下一页</a>');
        } else {
            dom.remove('.nextPage');
            dom.append('<span class="disabled">下一页</span>');
        }
    }

    // 点击事件  点击每一页相当于重新调用fillHtml填入参数  修改当前的显示值
    function bindEvent(obj, args) {
        //点击页码
        obj.on('click', '.tcdNumber', function () {
            let current = parseInt($(this).text());
            changePage(obj,args,current);
        });
        //上一页
        // a.prevPage   规定只能添加到指定的子元素上的事件处理程序
        obj.on('click', '.prevPage', function () {
            let current = parseInt(obj.children('.current').text());
            changePage(obj,args,current-1);            
        });
        //下一页
        obj.on('click', '.nextPage', function () {
            let current = parseInt(obj.children('.current').text());
            changePage(obj,args,current + 1);
        })
    }

    // 改变html内容
    function changePage(dom, args,page) {
        fillHtml(dom, { 'current': page, 'pageCount': args.pageCount });
        if (typeof (args.backFn === "function")) {
            args.backFn(page);
        }
    }

// 利用jquery中的extend方法扩展插件  将插件扩展到jquery的原型上 扩展实例插件
    $.fn.createPage = function (options) {
        // 拼接参数 即如果调用插件未传入参数选用默认参数 
        // 如果传入参数 利用传入参数覆盖默认参数
        let args = $.extend({
            pageCount: 5,
            current: 2,
            backFn: function () { }
        }, options);
        // 调用入口函数
        init(this, args)
    }
})(jQuery);