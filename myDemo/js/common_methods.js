/**
 * Created by Administrator on 2017/12/9.
 * 公用方法JS
 */

/*获取地址参数*/
function getQueryString1(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = decodeURI(window.location.href).substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

/*得到当前选中项是第几个*/
function query_element_id(element, name) {
    let elements = document.getElementsByName(name);
    for (let i = 0; i < elements.length; i++) {
        if (elements[i] === element) {
            return i;
        }
    }
}

/*字符串去左右两端的空格*/
function stringToSpace(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

/*删除左边的空格*/
function ltrim(str) {
    return str.replace(/(^\s*)/g, "");
}

/*删除右边的空格*/
function rtrim(str) {
    return str.replace(/(\s*$)/g, "");
}

/*验证邮箱*/
function isEmail(value) {
    //验证邮箱
    let reg = new RegExp('^[a-z0-9]+([._\\\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$'); //正则表达式
    return reg.test(value);
}

/*验证数字*/
function isNumber(value) {
    let reg = new RegExp('^[0-9]*$'); //正则表达式
    return reg.test(value);
}

/*验证手机号+固话*/
function isPhone(value) {
    let reg = new RegExp('((\\d{11})|^((\\d{7,8})|(\\d{4}|\\d{3})-(\\d{7,8})|(\\d{4}|\\d{3})-(\\d{7,8})-(\\d{4}|\\d{3}|\\d{2}|\\d{1})|(\\d{7,8})-(\\d{4}|\\d{3}|\\d{2}|\\d{1}))$)'); //正则表达式
    return reg.test(value);
}





/**封装ajax
 * 参数 method 请求方式 'GET' 'POST'
 * url 地址
 * callBack 回调函数
 * data 参数
 * flag 是否异步*/
function myAjax(method, url, callBack, data, flag) {
    //数据对象
    let result = null,
        //当参数是对象时，需要遍历属性并接收
        parameter = '',
        //创建ajax对象 ajax是异步请求
        xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp');
    //flag每值时默认为true
    flag = flag ? flag : true;
    //data不存在时,默认为对象.
    data = data ? data : {};
    //将请求方式转换为大写
    method = method ? method.toUpperCase() : 'GET';


    /**ajax状态改变触发事件
     *对象状态（integer），状态值
     *0 = 未初始化，未调用send()方法
     *1 = 读取中，已调用send()，正在发送请求
     *2 = 已读取，send方法执行完成，接收到全部响应内容
     *3 = 交互中，正在解析响应内容
     *4 = 完成，响应内容解析完成*/
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //将返回数据(字符串类型)转为json对象
            result = JSON.parse(xhr.responseText);
            if (result.status === 'success') {
                callBack(result);
            } else {
                console.log(result.errorText);
            }
        }
    };

    if (typeof data === 'object') {
        for (let prop in data) {
            parameter += prop + '=' + data[prop] + '&';
        }
    } else {
        data = data.toString();
    }

    data=parameter.length === 0 ? data : parameter;

    if (method === 'GET') {
        xhr.open(method, url + '?' + data , flag);
        xhr.send();
    } else if (method === 'POST') {
        xhr.open(method, url, flag);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }

}

//得到Navigator对象信息
function getNavigatorMessage() {
    let nVer = navigator.appVersion,
        nAgt = navigator.userAgent,
        browser = navigator.appName,
        version = '' + parseFloat(navigator.appVersion),
        majorVersion, nameOffset, verOffset, ix, network = 'unknown';
    // Opera
    if ((verOffset = nAgt.indexOf('Opera')) !== -1) {
        browser = 'Opera';
        version = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf('Version')) !== -1) {
            version = nAgt.substring(verOffset + 8);
        }
    }
    // Opera Next
    if ((verOffset = nAgt.indexOf('OPR')) !== -1) {
        browser = 'Opera';
        version = nAgt.substring(verOffset + 4);
    }
    // MSIE
    else if ((verOffset = nAgt.indexOf('MSIE')) !== -1) {
        browser = 'Microsoft Internet Explorer';
        version = nAgt.substring(verOffset + 5);
    }
    // Chrome
    else if ((verOffset = nAgt.indexOf('Chrome')) !== -1) {
        browser = 'Chrome';
        version = nAgt.substring(verOffset + 7);
    }
    // Safari
    else if ((verOffset = nAgt.indexOf('Safari')) !== -1) {
        browser = 'Safari';
        version = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf('Version')) !== -1) {
            version = nAgt.substring(verOffset + 8);
        }
    }
    // Firefox
    else if ((verOffset = nAgt.indexOf('Firefox')) !== -1) {
        browser = 'Firefox';
        version = nAgt.substring(verOffset + 8);
    }
    // MSIE 11+
    else if (nAgt.indexOf('Trident/') !== -1) {
        browser = 'Microsoft Internet Explorer';
        version = nAgt.substring(nAgt.indexOf('rv:') + 3);
    }
    // WeiXin
    else if (nAgt.indexOf('NetType/') !== -1) {
        browser = 'WeiXin';
        if (nAgt.indexOf('NetType/WIFI') !== -1) {
            network = 'WIFI';
        } else if (nAgt.indexOf('NetType/2G') !== -1) {
            network = '2G';
        } else if (nAgt.indexOf('NetType/3G+') !== -1) {
            network = '3G+';
        }
        verOffset = nAgt.lastIndexOf('/');
        version = nAgt.substring(verOffset + 1);
        if (browser.toLowerCase() === browser.toUpperCase()) {
            browser = navigator.appName;
        }
    }
    // Other browsers
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
        browser = nAgt.substring(nameOffset, verOffset);
        version = nAgt.substring(verOffset + 1);
        if (browser.toLowerCase() === browser.toUpperCase()) {
            browser = navigator.appName;
        }
    }

    // trim the version string
    if ((ix = version.indexOf(';')) !== -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(' ')) !== -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(')')) !== -1) version = version.substring(0, ix);
    majorVersion = parseInt('' + version, 10);
    if (isNaN(majorVersion)) {
        version = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }

    // mobile version
    let mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

    // start system detect
    let os = '';
    let clientStrings = [
        {s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/},
        {s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/},
        {s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/},
        {s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/},
        {s: 'Windows Vista', r: /Windows NT 6.0/},
        {s: 'Windows Server 2003', r: /Windows NT 5.2/},
        {s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/},
        {s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/},
        {s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/},
        {s: 'Windows 98', r: /(Windows 98|Win98)/},
        {s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/},
        {s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
        {s: 'Windows CE', r: /Windows CE/},
        {s: 'Windows 3.11', r: /Win16/},
        {s: 'Android', r: /Android/},
        {s: 'Open BSD', r: /OpenBSD/},
        {s: 'Sun OS', r: /SunOS/},
        {s: 'Linux', r: /(Linux|X11)/},
        {s: 'iOS', r: /(iPhone|iPad|iPod)/},
        {s: 'Mac OS X', r: /Mac OS X/},
        {s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
        {s: 'QNX', r: /QNX/},
        {s: 'UNIX', r: /UNIX/},
        {s: 'BeOS', r: /BeOS/},
        {s: 'OS/2', r: /OS\/2/},
        {s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
    ];
    for (let id in clientStrings) {
        let cs = clientStrings[id];
        if (cs.r.test(nAgt)) {
            os = cs.s;
            break;
        }
    }
    let osVersion = '';
    if (/Windows/.test(os)) {
        osVersion = /Windows (.*)/.exec(os)[1];
        os = 'Windows';
    }
    switch (os) {
        case 'Mac OS X':
            osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
            break;
        case 'Android':
            osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
            break;
        case 'iOS':
            osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
            osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
            break;
    }

    //detect data
    let params = {};
    params.os = os;//操作系统
    params.osVersion = osVersion ? osVersion : 'unknown';//操作系统版本
    params.mobile = mobile;//是否移动端访问
    params.browser = browser;//浏览器
    params.browserVersion = version;//浏览器版本
    params.browserMajorVersion = majorVersion;//浏览器major版本

    //输出对象
    console.log(params);
}

//异步加载JS
function loadScript(url, callback) {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    //先绑事件然后加载JS
    if (script.readyState) {
        //ie使用方法
        script.onreadystatechange = function () {
            if (script.readyState === 'complete' || script.readyState === 'loaded') {
                callback();
            }
        }
    } else {
        //safari chrome firefox opera都支持
        script.onload = function () {
            callback();
        }
    }
    script.src = url;
    document.head.appendChild(script);
}

//防抖 方法 延迟多少毫秒
function debounce(handler,delay) {
    return function () {
        let serf=this,arg=arguments;
        clearTimeout(handler.timer);
        handler.timer=setTimeout(function () {
            handler.apply(serf,arg);
        },delay);
    }
}

//节流 方法 等待多少毫秒
function throttle(handler,wait) {
    let lastTime=0;
    return function (e) {
        let nowTime=new Date().getTime();
        if (nowTime-lastTime>wait) {
            handler.apply(this,arguments);
            lastTime=nowTime;
        }
    }
}

//根据分页展示数量分割数组
function forPageSplitArray(arr, size) {
    let length = arr.length,
        newArr = [],
        i = Math.ceil(length / size),
        j = 0;
    while (j < i) {
        let spare = length - j * size >= size ? size : length - j * size,
            temp = arr.slice(j * size, j * size + spare);
        newArr.push(temp);
        j++;
    }
    return newArr;
}

/*判断数据类型*/
function myTypeOf(target) {
    /** 1.分两类 原始值 引用值
     * 2.区分引用值 数组或对象*/
        //模板
    let template = {
            '[object Array]': 'Array',
            '[object Object]': 'object',
            '[object Number]': 'number - object',
            '[object String]': 'string - object',
            '[object Boolean]': 'boolean - object',
        };
    let ret = typeof(target);
    if (target === null) {
        return 'null';
    } else if (ret === 'object') {
        //数组、对象、包装类 Object.prototype.toString
        let str = Object.prototype.toString.call(target);
        return template[str];
    } else {
        return ret;
    }
}

//求滚动条滚动的尺寸
function getScrollOffset() {
    //w3c标准方法
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        };
    } else {
        //IE8 及 IE8 以下使用的方法
        /*document.body.scrollLeft+ document.documentElement.scrollLeft
        其中一个有值，另外一个的值一定是 0。
        这两个最好的用法是取两个值相加，因为不可能存在两个同时有值*/
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop
        };
    }
}

//得到可视窗口的尺寸
function getViewportOffset() {
    /*注意渲染模式：
    1 标准模式：<！DOCTYPE html>是 html5 的（在 emmet 插件下 html:5 就出来了）
    2 怪异/混杂模式：试图去兼容之前的语法，去掉<！DOCTYPE html>这一行即可开启（向后兼容）
    2、document.documentElement.clientWidth/clientHeight
    标准模式下，任意浏览器都兼容 client 是客户端的意思
    3、document.body.clientWidth/clientHeight
    适用于怪异模式下的浏览器
    4、封装兼容性方法，返回浏览器视口尺寸 getViewportOffset()
    例 document.compatMode 是用于判断是怪异模式还是标准模式的*/
    //w3c标准模式
    if (window.innerWidth) {
        return {
            x: window.innerWidth,
            y: window.innerHeight
        };
    } else {
        //document.compatMode 是用于判断是怪异模式还是标准模式的
        //怪异/混杂模式
        if (document.compatMode === 'BackCompat') {
            return {
                x: document.body.clientWidth,
                y: document.body.clientHeight
            };
        } else {
            //IE8 及 IE8 以下兼容标准模式
            return {
                x: document.documentElement.clientWidth,
                y: document.documentElement.clientHeight
            }
        }
    }
}

//得到元素样式（元素，属性）
function getStyle(elem, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(elem, null)[prop];
    } else {
        return elem.currentStyle[prop];
    }
}

//深度克隆
function deepClone(origin, target) {
    /*1、先把所有的值都遍历一遍（看是引用值和原始值）
            用 for ( let prop in obj )，对象和数组都可以使用
    2、判断是原始值，还是引用值？用 typeof 判断是不是 object
         1）如果是原始值就直接拷贝
         2）如果是引用值，判断是数组还是对象
    3、判断是数组还是对象？（方法 instanceof【看 a 的原型链上有没有 b 的原型】、toString、constructor，建议用 toString,另外两个有个小 bug——跨父子域不行）
        1）如果是数组，就新建一个空数组；
        2）如果是对象，就新建一个空对象。
    4、建立了数组以后，如果是挨个看原始对象里面是什么，都是原始值就可以直接考过来了；或者，建立了对象以后，挨个判断对象里面的每一个值，看是原始值还是引用值
    5、递归*/
    // 建立要拷贝的对象
    let targets = target || {},
        // 获得toString方法
        toStr = Object.prototype.toString(),
        //拿到字符串'[Object Array]'进行比较是否是数组
        arrStr = '[Object Array]';

    for (let prop in origin) {
        //判断是否是原型链上的属性
        if (origin.hasOwnProperty(prop)) {
            //判断是引用值还是原始值
            if (origin[prop] !== 'null' && typeof (origin[prop]) === 'object') {
                //判断对象是不是数组
                /*if (toStr.call(origin[prop]) === arrStr) {
                     targets[prop] = [];
                 } else {
                     targets[prop] = {};
                 }*/
                targets[prop] = toStr.call(origin[prop]) === arrStr ? [] : {};
                deepClone(origin[prop], targets[prop]);
            } else {
                targets[prop] = origin[prop];
            }
        }
    }
    return targets;

}

//数组快速排序
function quickArr(arr) {
    let left = [], right = [];
    //获取基准值角标 let<standardVale<right
    if (arr.length <= 1) {
        return arr;
    }
    let index = Math.floor(arr.length / 2);
    //取出基准值并重原数组剔除
    let standardVale = arr.splice(index, 1)[0];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < standardVale) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickArr(left).concat(standardVale, quickArr(right));
}

//数组去重
Array.prototype.unique = function () {
    let temp = {}, arr = [], len = this.length;
    for (let i = 0; i < len; i++) {
        if (!temp[this[i]]) {
            temp[this[i]] = '数组值';
            arr.push(this[i]);
        }
    }
    return arr;
};

//自定义插入在某个元素之后插入元素(目标节点)
Element.prototype.insertAfter = function (targetNode, afterNode) {
    //得到元素的下一个兄弟节点
    let beforeNode = afterNode.nextElementSibling;
    //如果没有直接添加，有插入兄弟节点之前
    if (beforeNode == null) {
        this.appendChild(targetNode);
    } else {
        this.insertBefore(targetNode, beforeNode);
    }
};

//字符串中字符出现最多次
function maximumCharacter(str) {
    // 对象存储所有出现的字符及次数
    let stringObj = {},
        //最多出现次数
        max = 0,
        //最多的字符
        character = '';
    //取出字符串的每一个字符，在对象属性中记录字符和次数
    for (let i = 0; i < str.length; i++) {
        let art = str.charAt(i);
        if (!stringObj[art]) {
            stringObj[art] = 1;
        } else {
            stringObj[art]++;
        }
    }
    //找到字符出现最多的次数
    for (let key in stringObj) {
        if (max < stringObj[key]) {
            max = stringObj[key];
            character = key;
        }
    }
    console.log(character + "出现最多" + max + "次");
}

//字符串中字符连续出现最多次
function comeUpMostInARow(str) {
    // 对象存储所有出现的字符及次数
    let stringObj = {},
        //最多出现次数
        max = 0,
        //最多的字符
        character = '',
        //前一个字符
        priorArt = '',
        //上一次出现次数
        lastCount = {};
    //取出字符串的每一个字符，在对象属性中记录字符和次数
    for (let i = 0; i < str.length; i++) {
        let art = str.charAt(i);
        if (!stringObj[art]) {
            lastCount[art] = 1;
            stringObj[art] = 1;
            priorArt = art;
        } else {
            if (art === priorArt) {
                stringObj[art]++;
            } else {
                stringObj[art] = 1;
                priorArt = art;
            }
            if (lastCount[art] < stringObj[art]) {
                lastCount[art] = stringObj[art];
            }
        }
    }
    //判断对象是否为空对象
    // console.log(JSON.stringify(lastCount) === "{}");
    //找到字符出现最多的次数
    let obj = {};
    if (JSON.stringify(lastCount) === "{}") {
        obj = stringObj;
    } else {
        obj = lastCount;
    }
    for (let key in obj) {
        if (max <= obj[key]) {
            max = obj[key];
            character += key + ',';
        }
    }
    console.log(character.substring(0, character.length - 1) + "连续出现最多" + max + "次");
}

//给一个DOM对象添加该事件类型的处理函数 元素 类型 处理函数
function addEvent(elem, type, handle) {
    if (elem.addEventListener) {
        //IE9 以下不兼容，可以为一个事件绑定多个处理程序
        elem.addEventListener(type, handle, false);
    } else if (elem.attachEvent) {
        //IE 独有，一个事件同样可以绑定多个处理程序，同一个函数绑定多次都可以
        elem.attachEvent('on' + type, function () {
            handle.call(elem);
        });
    } else {
        elem['on' + type] = handle;
    }
}

//阻止事件冒泡
function stopBubble(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        //是否阻止冒泡
        event.cancelBubble = true;
    }
}

//阻止默认事件
function cancelHandler(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}

//清除绑定事件处理函数
function removeEvent(elem, type, handle) {
    if (elem.removeEventListener) {
        elem.removeEventListener(type, handle, false);
    } else {
        elem.detachEvent('on' + type, handle);
    }
}

//拖拽功能
function drag(elem) {
    let disX, disY;
    addEvent(elem, 'mousedown', function (e) {
        let event = e || window.event;
        //鼠标点击时距离上边和左边的距离
        disX = event.pageX - parseInt(getStyle(elem, 'left'));
        disY = event.pageY - parseInt(getStyle(elem, 'top'));
        addEvent(document, 'mousemove', mouseMove);
        addEvent(document, 'mouseup', mouseUp);
        stopBubble(event);
        cancelHandler(event);
    });

    function mouseMove(e) {
        let event = e || window.event;
        elem.style.left = event.pageX - disX + 'px';
        elem.style.top = event.pageY - disY + 'px';
    }

    function mouseUp(e) {
        let event = e || window.event;
        removeEvent(document, 'mousemove', mouseMove);
        removeEvent(document, 'mouseup', mouseUp);
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

//继承圣杯模式
function inherit(Target, Origin) {
    let F = function () {
    };
    F.prototype = Origin.prototype;
    Target.prototype = new F();
    Target.prototype.constructor = Target;
    //我们希望我们构造出的对象，能找到自己的超类，超级父级（究竟继承自谁）应该起名为super 但这个是保留字，我们就以 uber
    Target.prototype.uber = Origin.prototype;
}

//雅虎封装圣杯模式方法
let inheritTwo = (function () {
    let F = function () {
    };
    return function (Target, Origin) {
        F.prototype = Origin.prototype;
        Target.prototype = new F();
        Target.prototype.constructor = Target;
        //我们希望我们构造出的对象，能找到自己的超类，超级父级（究竟继承自谁）应该起名为super 但这个是保留字，我们就以 uber
        Target.prototype.uber = Origin.prototype;
    }
}());
















//=================================项目中具体用到的方面===================================
//将对象中的id拼成字符串
function jointString(objectArray) {
    let idList = '';
    for (let item = 0; item < objectArray.length; item++) {
        idList += ',' + objectArray[item].id;
    }
    idList.substring(1);
    console.log(idList.substring(1));
    return idList.substring(1);
}

//得到附件名称（详情展示用）
function getAccessoryName(objectArray) {
    //切割数组
    let strArr = [];
    //附件名称数组
    let fjNameArray = [];
    //附件名
    let fjName = '';
    //后缀名
    let suffix = '';
    for (let i = 0; i < objectArray.length; i++) {
        fjName = '';
        suffix = '';
        strArr = objectArray[i].split("/");
        console.log(strArr);
        console.log(strArr[strArr.length - 1].split("?")[0].split("."));
        suffix = strArr[strArr.length - 1].split("?")[0].split(".")[1];
        fjName = strArr[strArr.length - 1].split("?")[0].split(".")[0];
        fjNameArray[i] = fjName.substring(0, fjName.length - 36) + "." + suffix;
    }
    return fjNameArray;
}

/*修改时回显文件名(表单回显用)
传入地址字符串*/
function amendGetAccessoryName(object) {
    //将路径字符串以逗号切割
    let fileArray = object.split(',');
    //文件名
    let fileName = '';
    //后缀名
    let suffix = '';
    //文件具体地址切割数组
    let strArr = [];
    //文件列表
    let fileList = [];
    //文件对象
    let imgObject = {
        response: {data: ""},
        name: ""
    };
    for (let i = 0; i < fileArray.length; i++) {
        fileName = '';
        suffix = '';
        //将文件路径以/切割
        strArr = fileArray[i].split("/");
        suffix = strArr[strArr.length - 1].split("?")[0].split(".")[1];
        fileName = strArr[strArr.length - 1].split("?")[0].split(".")[0];
        imgObject.name = fileName.substring(0, fileName.length - 36) + "." + suffix;
        imgObject.response.data = fileArray[i];
        fileList.push(imgObject);
    }
    return fileList;
}

/*form表单附件地址 参数附件数组（表单上传时使用）*/
function formAttachmentAddress(objectArray) {
    let attachmentAddress = '';
    for (let item = 0; item < objectArray.length; item++) {
        attachmentAddress += ',' + objectArray[item].response.data;
    }
    // attachmentAddress.substring(1);
    return attachmentAddress.substring(1);
}

/*得到按钮权限(按钮id字符类型)
根据id查询是否有按钮权限
返回是否显示按钮*/
function getButtonPermissions(id) {
    let buttonObject = this.$store.state.buttonPermissions;
    let showButton = false;
    if (buttonObject === '' || buttonObject === null || buttonObject === undefined) {
        return showButton;
    } else {
        for (let i = 0; i < buttonObject.buttons.length; i++) {
            if (buttonObject.buttons[i].id === id) {
                console.log(buttonObject.buttons[i].label + '-----------' + buttonObject.buttons[i].show);
                showButton = buttonObject.buttons[i].show;
            }
        }
        return showButton;
    }
}

/*得到按钮权限(按钮id字符类型)
根据id查询是否有按钮权限
返回是否显示按钮*/
function getMenuPermissions(id) {
    let menuObject = this.$store.state.menu;
    let showMenu = false;
    if (menuObject === '' || menuObject === null || menuObject === undefined) {
        return showMenu;
    } else {
        for (let i = 0; i < menuObject.menus.length; i++) {
            if (menuObject.menus[i].id === id) {
                console.log(menuObject.menus[i].label + '-----------');
                showMenu = true;
                return showMenu;
            }
            if (menuObject.menus[i].children.length !== 0) {
                for (let u = 0; u < menuObject.menus[i].children.length; u++) {
                    if (menuObject.menus[i].children[u].id === id) {
                        console.log(menuObject.menus[i].children[u].label + '-----------');
                        showMenu = true;
                        return showMenu;
                    }
                }
            }
        }
        return showMenu;
    }
}

/*转换地图方法将地图JSON对象转成数组对象
参数 位置数组*/
function locationJsonToArray(locationArray) {
    //存储坐标对象
    let point = [];
    //检查对象类型
    let getType = Object.prototype.toString;
    for (let i = 0; i < locationArray.length; i++) {
        console.log(getType.call(locationArray[i]).substring(8, getType.call(locationArray[i]).length - 1));
        //getType.call(locationArray[i]) 得到的数据[object 类型] 取到后面的类型
        if (getType.call(locationArray[i]).substring(8, getType.call(locationArray[i]).length - 1) === 'Object') {
            point = [];
            point = [locationArray[i].lng, locationArray[i].lat];
            locationArray[i] = point;
        }
    }
    return locationArray;
}

/*初始化报表数据 参数 行数 列数*/
function createSheetData(row, col) {
    let data = [];
    for (let i = 0; i < row; i++) {
        let rowData = [];
        for (let j = 0; j < col; j++) {
            rowData.push('');
        }
        data.push(rowData);
    }
    return data;
}

/*新页签打开页面*/
function newTagOpenPage(path) {
    window.open(window.location.origin + '/#/' + path)
}

