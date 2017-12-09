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