(function () {
    function jQuery(selector) {
        return new jQuery.prototype.init(selector);
    }

    //实例方法
    jQuery.prototype.init = function (selector) {
        //选出dom对象并包装成jQuery对象
        let dom = null;
        this.length = 0;
        if (selector === null || selector === undefined) {
            return this;
        }
        //判断传入的值是否是dom对象
        if (typeof selector === 'string' && selector.indexOf('.') !== -1) {
            dom = document.getElementsByClassName(selector.slice(1));
        } else if (typeof selector === 'string' && selector.indexOf('#') !== -1) {
            dom = document.getElementById(selector.slice(1));
        }
        if (selector instanceof Element || dom.length === undefined) {
            this[0] = dom || selector;
            this.length++;
        } else {
            //基础铺垫
            for (let i = 0; i < dom.length; i++) {
                this[i] = dom[i];
                this.length++;
            }
        }
    };
    jQuery.prototype.css = function (config) {
        //循环操作每一个dom
        for (let i = 0; i < this.length; i++) {
            for (let attr in config) {
                this[i].style[attr] = config[attr];
            }
        }
        //jQuery 链式操作精髓
        return this;
    };
    jQuery.prototype.pushStack = function (dom) {
        if (dom.constructor !== jQuery) {
            dom = jQuery(dom);
        }
        dom.prevObject = this;
        return dom;
    };
    jQuery.prototype.get = function (num) {
        /*if (num===null){
            //将类数组转换为数组
            return [].slice.call(this,0);
        }else {
            return num>=0?this[num]: this[num+this.length];
        }*/
        return num != null ? (num >= 0 ? this[num] : this[num + this.length]) : [].slice.call(this, 0);
    };
    jQuery.prototype.eq = function (num) {
        let dom = num != null ? (num >= 0 ? this[num] : this[num + this.length]) : null;
        return this.pushStack(dom);
    };
    jQuery.prototype.add = function (selector) {
        let curObj = jQuery(selector);
        let baseObj = this;
        let newObj = jQuery();
        for (let i = 0; i < curObj.length; i++) {
            newObj[newObj.length++] = curObj[i];
        }
        for (let i = 0; i < baseObj.length; i++) {
            //此时this指newObj
            newObj[newObj.length++] = baseObj[i];
        }
        this.pushStack(newObj);
        return newObj;
    };
    jQuery.prototype.end = function () {
        return this.prevObject;
    };
    jQuery.prototype.myOn = function (type, handle) {
        for (let i = 0; i < this.length; i++) {
            // cacheEvent缓存自定义方法对象
            if (!this[i].cacheEvent) {
                this[i].cacheEvent = {};
            }
            //自定义事件可以绑定多个
            !this[i].cacheEvent[type] ? this[i].cacheEvent[type] = [handle] : this[i].cacheEvent[type].push(handle);
        }
    };
    jQuery.prototype.myTrigger = function (type) {
        let params = arguments.length > 1 ? [].slice.call(arguments, 1) : [],
            self = this;
        for (let i = 0; i < this.length; i++) {
            if (this[i].cacheEvent[type]) {
                this[i].cacheEvent[type].forEach(function (ele, index) {
                    ele.apply(self, params);
                })
            }
        }
    };
    jQuery.prototype.myQueue = function () {
        let queObj = this, addFun = arguments[1] || null, len = arguments.length;
        arguments[0] = arguments[0] || 'fx';
        //获取队列
        if (len === 1) {
            return queObj[0][arguments[0]];
        }
        //添加队列或往已有队列中添加内容
        queObj[0][arguments[0]] === undefined ? queObj[0][arguments[0]] = [addFun] : queObj[0][arguments[0]].push(addFun);
        return this;
    };
    jQuery.prototype.myDeQueue = function (type) {
        let queueName = arguments[0] || 'fx',
            currFun = this.myQueue(queueName).shift(),
            self = this;

        if (currFun === undefined) {
            return;
        }
        let next = function () {
            self.myDeQueue(queueName);
        };
        currFun(next);
        return self;
    };
    jQuery.prototype.myAnimate = function (target, callback) {
        let len = this.length,
            self = this,
            //最后添加到队列里的内容函数
            baseFunction = function (next) {
                let times = 0;
                for (let i = 0; i < len; i++) {
                    startMove(self[i], target, function () {
                        times++;
                        if (times === len) {
                            callback && callback();
                            next();
                        }
                    })
                }
            };
        this.myQueue('fx', baseFunction);
        if (this.myQueue('fx').length === 1) {
            this.myDeQueue('fx');
        }


        //得到元素样式（元素，属性）
        function getStyle(elem, prop) {
            if (window.getComputedStyle) {
                return window.getComputedStyle(elem, null)[prop];
            } else {
                return elem.currentStyle[prop];
            }
        }

        //多物体多值运动+回调机制（调用对象，属性对象，回调函数）
        function startMove(dom, attrObj, callback) {
            //保证只有一个定时器在运行
            clearInterval(dom.timer);
            //速度
            let speed = null,
                //属性当前值
                iCur = null;
            //给每一个对象分配一个定时器
            dom.timer = setInterval(function () {
                //是否可以停止
                let bStop = true;
                for (let attr in attrObj) {
                    //属性是否是opacity  opacity（透明度）的范围是0~1之间 可以将当前值、目标值都扩大一百倍，最后再缩小100倍
                    iCur = attr === 'opacity' ? parseFloat(getStyle(dom, attr)) * 100 : parseInt(getStyle(dom, attr));
                    //速度等于目标点减当前值 除以一个数 不让当前值一下等于目标值
                    speed = (attrObj[attr] - iCur) / 8;
                    //ceil向上取整 floor向下取整 小数不足以使像素发生改变 所以要取整
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                    dom.style[attr] = attr === 'opacity' ? (iCur + speed) / 100 : iCur + speed + 'px';
                    //如果对象里有一个属性没有到达目标值就不能停
                    if (iCur !== attrObj[attr]) {
                        bStop = false;
                    }
                }
                //当所有属性到达目标值停止定时器
                if (bStop) {
                    clearInterval(dom.timer);
                    //callback是方法时就调用
                    typeof callback === 'function' && callback();
                }
            }, 20);
        }

        return this;
    };
    jQuery.prototype.myDelay = function (duration) {
        let queueArr = this[0]['fx'];
        queueArr.push(function (next) {
            setTimeout(function () {
                next();
            }, duration);
        });
        return this;
    };
    //工具方法
    jQuery.myCallBacks = function (duration) {
        // 'once' 'memory' 'once memory' null
        //储存参数
        let options = arguments[0] || '',
            //通过add方法 来加入的方法
            list = [],
            //记录当前要执行的函数索引
            fireIndex = 0,
            //记录是否被fire过
            fired = false,
            //实际参数列表
            args = [],
            fire = function () {
                for (; fireIndex < list.length; fireIndex++) {
                    list[fireIndex].apply(window, args);
                }
                if (options.indexOf('once') !== -1) {
                    list = [];
                    fireIndex = 0;
                }
            };
        return {
            add: function (fun) {
                //将传入的方法添加到数组中
                list.push(fun);
                if (options.indexOf('memory') !== -1 && fired) {
                    fire();
                }
                return this;
            },
            fire: function () {
                fireIndex = 0;
                args = arguments;
                fired = true;
                fire();
            }
        };
    };
    jQuery.myDeferred = function () {
        let arrCallbacks = [
                [jQuery.myCallBacks('once memory'), 'done', 'resolve'],
                [jQuery.myCallBacks('once memory'), 'fail', 'reject'],
                [jQuery.myCallBacks('memory'), 'progress', 'notify'],
            ],
            pendding = true,
            deferred = {};
        arrCallbacks.forEach(function (ele, index) {
            deferred[ele[1]] = function (fun) {
                ele[0].add(fun);
            };
            deferred[ele[2]] = function (fun) {
                let arg = arguments;
                if (pendding) {
                    ele[0].fire.apply(window, arg);
                    pendding = !(ele[2] === 'resolve' || ele[2] === 'reject');
                }
            };
        });
        return deferred;
    };

    jQuery.prototype.init.prototype = jQuery.prototype;
    window.$ = window.jQuery = jQuery;
}());