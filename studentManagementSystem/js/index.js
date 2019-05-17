//弹窗
let dialog = document.getElementsByClassName('dialog')[0],
    //所有数据
    /*tableData = [
        {
            id: 6,
            name: "张某某2",
            birth: 1997,
            sex: 1,
            sNo: "1",
            email: "382246268@qq.com",
            phone: "18846411586",
            address: "黑龙江省哈尔滨市XXXX",
        },
        {
            id: 6,
            name: "张某某2",
            birth: 1997,
            sex: 1,
            sNo: "2",
            email: "382246268@qq.com",
            phone: "18846411586",
            address: "黑龙江省哈尔滨市XXXX",
        },
        {
            id: 6,
            name: "张某某2",
            birth: 1997,
            sex: 1,
            sNo: "3",
            email: "382246268@qq.com",
            phone: "18846411586",
            address: "黑龙江省哈尔滨市XXXX",
        },
        {
            id: 6,
            name: "张某某2",
            birth: 1997,
            sex: 1,
            sNo: "4",
            email: "382246268@qq.com",
            phone: "18846411586",
            address: "黑龙江省哈尔滨市XXXX",
        },
        {
            id: 6,
            name: "张某某2",
            birth: 1997,
            sex: 1,
            sNo: "11009",
            email: "382246268@qq.com",
            phone: "18846411586",
            address: "黑龙江省哈尔滨市XXXX",
        },
        {
            id: 6,
            name: "张某某2",
            birth: 1997,
            sex: 1,
            sNo: "11009",
            email: "382246268@qq.com",
            phone: "18846411586",
            address: "黑龙江省哈尔滨市XXXX",
        },
        {
            id: 6,
            name: "张某某2",
            birth: 1997,
            sex: 1,
            sNo: "11009",
            email: "382246268@qq.com",
            phone: "18846411586",
            address: "黑龙江省哈尔滨市XXXX",
        },
        {
            id: 6,
            name: "张某某2",
            birth: 1997,
            sex: 1,
            sNo: "11009",
            email: "382246268@qq.com",
            phone: "18846411586",
            address: "黑龙江省哈尔滨市XXXX",
        },
        {
            id: 6,
            name: "张某某2",
            birth: 1997,
            sex: 1,
            sNo: "11009",
            email: "382246268@qq.com",
            phone: "18846411586",
            address: "黑龙江省哈尔滨市XXXX",
        },
        {
            id: 6,
            name: "张某某2",
            birth: 1997,
            sex: 1,
            sNo: "11009",
            email: "382246268@qq.com",
            phone: "18846411586",
            address: "黑龙江省哈尔滨市XXXX",
        },
        {
            id: 6,
            name: "张某某2",
            birth: 1997,
            sex: 1,
            sNo: "11009",
            email: "382246268@qq.com",
            phone: "18846411586",
            address: "黑龙江省哈尔滨市XXXX",
        },
        {
            id: 6,
            name: "张某某2",
            birth: 1997,
            sex: 1,
            sNo: "11009",
            email: "382246268@qq.com",
            phone: "18846411586",
            address: "黑龙江省哈尔滨市XXXX",
        },
        {
            id: 6,
            name: "张某某2",
            birth: 1997,
            sex: 1,
            sNo: "11009",
            email: "382246268@qq.com",
            phone: "18846411586",
            address: "黑龙江省哈尔滨市XXXX",
        },
        {
            id: 6,
            name: "张某某2",
            birth: 1997,
            sex: 1,
            sNo: "11009",
            email: "382246268@qq.com",
            phone: "18846411586",
            address: "黑龙江省哈尔滨市XXXX",
        },
        {
            id: 6,
            name: "张某某2",
            birth: 1997,
            sex: 1,
            sNo: "11009",
            email: "382246268@qq.com",
            phone: "18846411586",
            address: "黑龙江省哈尔滨市XXXX",
        },
        {
            id: 6,
            name: "张某某2",
            birth: 1997,
            sex: 1,
            sNo: "11009",
            email: "382246268@qq.com",
            phone: "18846411586",
            address: "黑龙江省哈尔滨市XXXX",
        },],*/
    tableData = [],
    //遮罩层
    mask = document.getElementsByClassName('mask')[0],
    //总数据数
    num = 0,
    //当前页
    currentPage = 1,
    //每页展示多少条数据
    contentSize = 10,
    //总页数
    maxPage = 1;

//创建学生
function creatStudent(sNo) {
    //单字 主要功能随机生成姓名
    let str = '赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮卞齐康伍余元卜顾孟平黄和穆萧尹姚邵湛汪祁毛禹狄米贝明臧计伏成戴谈宋茅庞熊纪舒屈项祝董梁杜阮蓝闵席季麻强贾路娄危江童颜郭梅盛林刁钟徐邱骆高夏蔡田樊胡凌霍虞万支柯昝管卢莫经房裘缪干解应宗丁宣贲邓郁单杭洪包诸左石崔吉钮龚程嵇邢滑裴陆荣翁荀羊於惠甄曲家封芮羿储靳汲邴糜松井段富巫乌焦巴弓牧隗山谷车侯宓蓬全郗班仰秋仲伊宫宁仇栾暴甘钭厉戎祖武符刘景詹束龙叶幸司韶郜黎蓟薄印宿白怀蒲邰从鄂索咸籍赖卓蔺屠蒙池乔阴鬱胥能苍双闻莘党翟谭贡劳逄姬申扶堵冉宰郦雍卻璩桑桂濮牛寿通边扈燕冀郏浦尚农温别庄晏柴瞿阎充慕连茹习宦艾鱼容向古易慎戈廖庾终暨居衡步都耿满弘匡国文寇广禄阙东欧殳沃利蔚越夔隆师巩厍聂晁勾敖融冷訾辛阚那简饶空曾毋沙乜养鞠须丰巢关蒯相查后荆红游竺权逯盖益桓公仉督晋楚闫法汝鄢涂钦归海岳帅缑亢况郈有琴商牟佘佴伯赏墨哈谯笪年爱阳佟言福',
        //双字
        str2 = '万俟司马上官欧阳夏侯诸葛闻人东方赫连皇甫尉迟公羊澹台公冶宗政濮阳淳于单于太叔申屠公孙仲孙轩辕令狐钟离宇文长孙慕容鲜于闾丘司徒司空丌官司寇子车颛孙端木巫马公西漆雕乐正壤驷公良拓跋夹谷宰父谷梁段干百里东郭南门呼延羊舌微生梁丘左丘东门西门南宫第五',
        //姓
        surName = [],
        //名
        lastName = '',
        sex = Math.ceil((Math.random() * 10) )% 2;
    surName = str.split('');
    for (let i = 0; i < str2.length; i++) {
        if (i % 2 === 1) {
            surName.push(str2[i - 1] + str2[i]);
        }
    }
    for (let i = 0; i <= sex; i++) {
        let str = '\\u' + (Math.round(Math.random() * 20901) + 19968).toString(16);
        // console.log(unescape(str.replace(/\\u/g, "%u")));
        lastName += unescape(str.replace(/\\u/g, "%u"));
    }
    return {
        name: surName[Math.ceil(Math.random()*504)]+lastName,
        sNo: sNo,
        birth: 1970 + Math.round(55 * Math.random()),
        sex: sex,
        phone: '1' + Math.ceil(Math.random() * 10000000000),
        email: Math.ceil(Math.random() * 1000000)+ '@163.com',
        address: '北京',
    }
}

//初始化页面
function init() {
    // tableData = forPageSplitArray(tableData, contentSize);
    //获取学生列表所有数据
    getStudentList();
    //渲染第一页数据
    renderTableData(0);
    //绑定事件
    bindEvent();
    maxPage = Math.ceil(num / contentSize) || 1;
    //初始化分页控件
    $('.page').createPage({
        // 总页数=总数据/每页展示多少条数据
        pageCount: maxPage,
        // 默认选中页数
        current: 1,
        // 点击选中页数后 回调
        backFn: function (p) {
            currentPage = p;
            // console.log(currentPage);
            renderTableData(p - 1);
        }
    });
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

//绑定事件
function bindEvent() {
    //菜单栏切换 获取dl标签
    let menuList = document.getElementsByClassName('menu-list')[0];
    $(menuList).on('click', changeMenu);

    // 添加按钮添加学生
    let addStudentBtn = document.getElementById('add-student-btn');
    addStudentBtn.addEventListener('click', function (e) {
        changeStudentInfo(e, 'addStudent', 'add-student-form');
    }, false);

    //编辑表单 提交按钮点击事件
    let editStudentBtn = document.getElementById('edit-student-btn');
    editStudentBtn.addEventListener('click', function (e) {
        changeStudentInfo(e, 'updateStudent', 'edit-student-form');
    }, false);

    //编辑和删除事件委托给tbody
    let tbody = document.getElementById('tbody');
    $(tbody).on('click', tbodyClick);

    //遮罩层点击事件
    mask.addEventListener('click', function () {
        dialog.classList.remove('show');
    }, false);

}

//tbody内部按钮点击事件
function tbodyClick(e) {
    let tagName = e.target.tagName.toLocaleLowerCase();
    if (tagName !== 'button') {
        return false;
    }
    let isEdit = e.target.className.indexOf('edit') > -1,
        isDel = e.target.className.indexOf('del') > -1,
        index = e.target.getAttribute('data-index');

    if (isEdit) {
        dialog.classList.add('show');
        renderFrom(tableData[currentPage - 1][index]);
    } else if (isDel) {
        delStudent(tableData[currentPage - 1][index]);
    }
}

//回填
function renderFrom(data) {
    let form = document.getElementById('edit-student-form');
    for (let prop in data) {
        form[prop] ? form[prop].value = data[prop] : '';
    }
}

//学生信息 添加或修改 元素 网络地址 formId
function changeStudentInfo(e, url, id) {
    // 阻止表单的默认提交刷新事件
    e.preventDefault();
    // 获取表单元素
    let form = document.getElementById(id),
        data = getFormDta(form),
        msg = '是否更新数据?';
    if (!data) {
        return false;
    }
    msg = id === 'edit-student-form' ? '是否更新数据?' : '提交成功, 是否跳转页面？';
    transferData(url, data, function () {
        // 确认弹框是否跳转页面
        let isTurnPage = confirm(msg);
        // 如果是 则跳转到列表页
        if (isTurnPage) {
            // 重置表单
            form.reset();
            if (id === 'edit-student-form') {
                mask.click();
                //分页查询
                findByPage();
                //渲染当前页数据
                renderTableData(currentPage - 1);
            } else {
                // 手动触发列表导肮的点击事件
                let studentListTab = document.getElementsByClassName('list')[0];
                studentListTab.click();
                getStudentList();
                if (Math.ceil(num / contentSize) > maxPage) {
                    maxPage = Math.ceil(num / contentSize);
                    createPage(maxPage);
                }
                //显示渲染第一页数据
                renderTableData(0);
            }
        }
    });
}

//删除学生
function delStudent(ele) {
    // 确认弹框是否跳转页面
    let isTurnPage = confirm('确定删除该学生？');
    // 如果是 则跳转到列表页
    if (isTurnPage) {
        //保存到服务器端
        transferData('delBySno', {sNo: ele.sNo}, function () {
            alert('删除成功!');
            findByPage();
            renderTableData(currentPage - 1);
        });
    }
}

//数据交互
function transferData(url, data, cb) {
    if (!data) {
        data = {};
    }
    //object.assign对象拼接dongmeiqi_1551761333531
    let result = saveData('http://api.duyiedu.com/api/student/' + url, Object.assign(data, {appkey: 'dongmeiqi_1551761333531'}));
    if (result.status === 'success') {
        cb(result);
        return result;
    } else {
        alert(result.msg);
    }

}

// 向后端存储数据
function saveData(url, param) {
    let result = null;
    let xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    if (typeof param === 'string') {
        xhr.open('GET', url + '?' + param, false);
    } else if (typeof param === 'object') {
        let str = "";
        for (let prop in param) {
            str += prop + '=' + param[prop] + '&';
        }
        xhr.open('GET', url + '?' + str, false);
    } else {
        xhr.open('GET', url + '?' + param.toString(), false);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                result = JSON.parse(xhr.responseText);
            }
        }
    };
    xhr.send();
    return result;
}

//获取表单数据
function getFormDta(form) {
    let name = form.name.value,
        sNo = form.sNo.value,
        birth = form.birth.value,
        sex = form.sex.value,
        phone = form.phone.value,
        email = form.email.value,
        address = form.address.value,
        errorArray = [[!name || !sNo || !birth || !phone || !email || !address, '部分数据未填写,请填写往成后提交!'],
            [!isNumber(sNo) || sNo.length < 6, '学号只能为6位数纯数字!'],
            [!isEmail(email), '请输入正确的邮箱地址!例:11@qq.com'],
            [!isNumber(birth) || birth.length < 4, '请输入四位正确的出生年!例如:1992'],
            [!isPhone(phone), '请输入正确的手机号或座机!']];
    for (let i = 0; i < errorArray.length; i++) {
        if (errorArray[i][0]) {
            alert(errorArray[i][1]);
            return false;
        }
    }
    return {
        name: name,
        sNo: sNo,
        birth: birth,
        sex: sex,
        phone: phone,
        email: email,
        address: address,
    }
}

// 切换导航条
function changeMenu(e) {
    //获取左侧导航标签点击
    let tagName = e.target.tagName;
    if (tagName === 'DD') {
        // 切换左侧导航样式
        initMenuCss(e.target);
        // 获取点击导航上的data-id属性并根据id显示右侧内容
        let id = e.target.getAttribute('data-id'),
            rightContent = document.getElementById(id);
        // 切换右侧内容区
        initContentCss(rightContent);
        if (id === 'student-list') {
            getStudentList();
            //显示渲染第一页数据
            $('.page').children(1).trigger('click');
        } else {
            //重置表单
            document.getElementById('add-student-form').reset();
        }
    }
}

// 渲染表格数据
function renderTableData(page) {
    // console.log(tableData[page]);
    let str = '';
    if (tableData.length !== 0) {
        if (tableData[page].length === 0) {
            if (tableData[page - 1]) {
                maxPage -= 1;
                currentPage -= 1;
                tableData[page - 1].forEach(function (item, index) {
                    str += ' <tr>\
            <td>' + item.sNo + '</td>\
            <td>' + item.name + '</td> \
            <td>' + (item.sex ? '女' : '男') + '</td>\
            <td>' + item.email + '</td>\
            <td>' + (new Date().getFullYear() - item.birth) + '</td>\
            <td>' + item.phone + '</td>\
            <td>' + item.address + '</td>\
            <td>\
                <button class="btn edit" data-index=' + index + '>编辑</button>\
                <button class="btn del" sno=' + item.sNo + '  data-index=' + index + '>删除</button>\
            </td>\
        </tr>'
                });
                createPage(maxPage, currentPage);
            }
        } else {
            tableData[page].forEach(function (item, index) {
                str += ' <tr>\
            <td>' + item.sNo + '</td>\
            <td>' + item.name + '</td> \
            <td>' + (item.sex ? '女' : '男') + '</td>\
            <td>' + item.email + '</td>\
            <td>' + (new Date().getFullYear() - item.birth) + '</td>\
            <td>' + item.phone + '</td>\
            <td>' + item.address + '</td>\
            <td>\
                <button class="btn edit" data-index=' + index + '>编辑</button>\
                <button class="btn del" sno=' + item.sNo + '  data-index=' + index + '>删除</button>\
            </td>\
        </tr>'
            });
        }
        let tBody = document.getElementById('tbody');
        tBody.innerHTML = str;
    }
}

//创建分页控件
function createPage(maxPage, currentPages) {
    $('.page').empty().createPage({
        // 总页数=总数据/每页展示多少条数据
        pageCount: maxPage,
        // 默认选中页数
        current: currentPages || 1,
        // 点击选中页数后 回调
        backFn: function (p) {
            currentPage = p;
            // console.log(currentPage);
            renderTableData(p - 1);
        }
    });
}

//获取学生列表
function getStudentList() {
    transferData('findAll', '', function (res) {
        // console.log(res.data);
        num = res.data.length;
        if (num !== 0) {
            //根据分页展示数量分割数组
            tableData = forPageSplitArray(res.data, contentSize);
        }
    });
}

//分页查询学生
function findByPage() {
    transferData('findByPage', {page: currentPage, size: contentSize}, function (res) {
        // console.log(res.data);
        //根据分页展示数量分割数组
        tableData[currentPage - 1] = res.data.findByPage;
    });
}

//切换右侧内容区展示情况
function initContentCss(dom) {
    // 把有侧class类名为content-active的元素删除content-active类名 用于切换左侧导航
    let active = document.getElementsByClassName('content-active');
    for (let i = 0; i < active.length; i++) {
        active[i].classList.remove('content-active');
    }
    dom.classList.add('content-active');
}

//初始化左侧菜单
function initMenuCss(dom) {
    // 把左侧class类名为active的元素删除active类名 用于切换左侧导航
    let active = document.getElementsByClassName('active');
    for (let i = 0; i < active.length; i++) {
        active[i].classList.remove('active');
    }
    dom.classList.add('active');
}

init();