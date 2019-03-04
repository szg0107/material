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

