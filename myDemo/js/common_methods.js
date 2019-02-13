/**
 * Created by Administrator on 2017/12/9.
 * 公用方法JS
 */

/*通过id获取对象*/
function getObjectById(id) {
    var obj = document.getElementById(id);
    return obj;
}

/*获取地址参数*/
function getQueryString1(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = decodeURI(window.location.href).substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

/*得到当前选中项是第几个*/
function query_element_id(element, name) {
    var elements = document.getElementsByName(name);
    for (var i = 0; i < elements.length; i++) {
        if (elements[i] == element) {
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
    }else if (ret === 'object') {
        //数组、对象、包装类 Object.prototype.toString
        let str = Object.prototype.toString.call(target);
        return template[str];
    } else {
        return ret;
    }
}

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