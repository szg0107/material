//所有数据
let tableData = [],
    //总数据数
    num = 0,
    //当前页
    currentPage = 1,
    //每页展示多少条数据
    contentSize = 10,
    //总页数
    maxPage = 1,
    //搜索框里面的内容  关键字
    val = $('#search-word').val();

//初始化页面
function init() {
    //获取第一页数据
    findByPage();
    //绑定事件
    bindEvent();
}

//绑定事件
function bindEvent() {
    //菜单栏切换
    $('.menu-list').on('click', 'dd', function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $('#search-word').val('');
        let id = $(this).data('id');
        if (id === 'student-list') {
            currentPage = 1;
            findByPage();
        } else {
            //重置表单
            $('#add-student-form')[0].reset();
        }
        $('.content').fadeOut();
        $('#' + id).fadeIn();
    });

    // 添加按钮添加学生
    $('#add-student-btn').click(function (e) {
        changeStudentInfo(e, 'addStudent', 'add-student-form');
    });

    //编辑表单 提交按钮点击事件
    $('#edit-student-btn').click(function (e) {
        changeStudentInfo(e, 'updateStudent', 'edit-student-form');
    });


    //编辑和删除事件委托给tbody
    $('#tbody').on('click', function (e) {
        tbodyClick(e);
    });

    //遮罩层点击事件
    $('.mask').on('click', function () {
        $('.dialog').slideUp();
    });

    // 搜索按钮点击事件
    $('#search-submit').on('click', searchStudent);
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
        $('.dialog').slideDown();
        renderFrom(tableData[index]);
    } else if (isDel) {
        delStudent(tableData[index]);
    }
}

//回填
function renderFrom(data) {
    // console.log(data);
    let form = $('#edit-student-form')[0];
    for (let prop in data) {
        form[prop] ? form[prop].value = data[prop] : '';
    }
}

//学生信息 添加或修改 元素 网络地址 formId
function changeStudentInfo(e, url, id) {
    // 阻止表单的默认提交刷新事件
    e.preventDefault();
    // console.log(e, url, id);
    //serializeArray()通过序列化表单值来创建对象数组（名称和值）
    let data = formatObj($('#' + id).serializeArray()),
        msg = '是否更新数据?';
    if (!data) {
        return false;
    }
    msg = id === 'edit-student-form' ? '是否更新数据?' : '提交成功, 是否跳转页面？';
    transferData(url, data, function (res) {
        // 确认弹框是否跳转页面
        let isTurnPage = confirm(msg);
        // 如果是 则跳转到列表页
        if (isTurnPage) {
            // 重置表单
            $('#' + id)[0].reset();
            if (id === 'edit-student-form') {
                $('.mask').trigger('click');
                //分页查询
                findByPage();
            } else {
                // 手动触发列表导肮的点击事件
                $('.list').trigger('click');
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
        });
    }
}

//数据交互
function transferData(url, data, cb) {
    if (!data) {
        data = {};
    }
    //object.assign对象拼接dongmeiqi_1551761333531
    $.ajax({
        type: 'get',
        url: 'http://api.duyiedu.com/api/student/' + url,
        data: $.extend(data, {
            appkey: 'szg0107_1553776746206',
        }),
        dataType: 'json',
        success: function (result) {
            if (result.status === 'success') {
                cb(result);
                return result;
            } else {
                alert(result.msg);
            }
        }
    });
}

//格式化对象
function formatObj(arr) {
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
        if (!obj[arr[i].name]) {
            obj[arr[i].name] = arr[i].value;
        }
    }
    let errorArray = [[!obj.name || !obj.sNo || !obj.birth || !obj.phone || !obj.email || !obj.address, '部分数据未填写,请填写往成后提交!'],
        [!isNumber(obj.sNo) || obj.sNo.length < 4, '学号只能为4位数纯数字!'],
        [!isEmail(obj.email), '请输入正确的邮箱地址!例:11@qq.com'],
        [!isNumber(obj.birth) || obj.birth.length < 4, '请输入四位正确的出生年!例如:1992'],
        [!isPhone(obj.phone), '请输入正确的手机号或座机!']];
    for (let i = 0; i < errorArray.length; i++) {
        if (errorArray[i][0]) {
            alert(errorArray[i][1]);
            return false;
        }
    }
    return obj;
}

// 渲染表格数据
function renderTableData() {
    // console.log(tableData);
    let str = '';
    if (tableData.length !== 0) {
        tableData.forEach(function (item, index) {
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
        let tBody = document.getElementById('tbody');
        tBody.innerHTML = str;
        $('.page').page({
            allPageSize: num,
            pageSize: contentSize,
            nowPage: currentPage,
            changePageCB: function (obj) {
                currentPage=obj.nowPage;
                contentSize=obj.pageSize;
                if (val) {
                    searchStudent();
                } else {
                    findByPage();
                }
            },
        });
    }
}

//创建分页控件 小松老师的分页控件
function createPage(maxPage, currentPages) {
    $('.page').empty().off().createPage({
        // 总页数=总数据/每页展示多少条数据
        pageCount: maxPage,
        // 默认选中页数
        current: currentPages || 1,
        // 点击选中页数后 回调
        backFn: function (p) {
            currentPage = p;
            // console.log(currentPage);
            if (val) {
                searchStudent();
            } else {
                findByPage();
            }
        }
    });
}

//分页查询学生
function findByPage() {
    transferData('findByPage', {page: currentPage, size: contentSize}, function (res) {
        // console.log(res.data);
        if (currentPage === 1) {
            num = res.data.cont;
            maxPage = Math.ceil(num / contentSize) || 1;
            //初始化分页控件
            // createPage(maxPage);
        }
        //根据分页展示数量分割数组
        tableData = res.data.findByPage;
        //渲染当前页数据
        renderTableData();
    });
}

//搜索学生
function searchStudent() {
    // 搜索框里面的内容  关键字
    val = $('#search-word').val();
    if (val) {
        transferData('searchStudent', {
            sex: -1,
            page: currentPage,
            size: contentSize,
            search: val,
        }, function (res) {
            // console.log(res);
            if (res.data.searchList.length!==0) {
                if (res.data.cont < num) {
                    num = res.data.cont;
                    maxPage = Math.ceil(num / contentSize);
                    currentPage = 1;
                    // createPage(maxPage);
                }
                //根据分页展示数量分割数组
                tableData = res.data.searchList;
                //显示渲染第一页数据
                renderTableData();

            } else {
                alert('很抱歉，没有找到与“' + val + '”相关的学生。');
            }
        });
    } else {
        currentPage = 1;
        //获取学生列表所有数据
        findByPage();
    }
}

init();
