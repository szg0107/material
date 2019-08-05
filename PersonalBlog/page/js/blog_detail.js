const blogId = getQueryString('blogId'),
    blogDetail = new Vue({
        el: '#blog_detail',
        data: {
            blogDetailObj: {}
        },
        computed: {},
        created: function () {
            if (blogId !== null) {
                axios({
                    method: 'get',
                    url: `/queryBlogById?blogId=${blogId}`,
                }).then((res) => {
                    // console.log(res);
                    this.blogDetailObj = res.data.data[0];
                }).catch((error) => {
                    console.log(error)
                });
            }
        }
    }),
    sendComment = new Vue({
        el: '#send_comment',
        data: {
            //验证码
            vCode: '',
            //验证码对应的文字
            rightCode: ''
        },
        computed: {
            //添加留言
            sendComment: function () {
                return function () {
                    //验证码
                    const code = document.getElementById("comment_code");
                    if (code.value !== this.rightCode) {
                        alert('验证码有误');
                        this.changeCode();
                        return;
                    }
                    //是否回复
                    const reply = document.getElementById("comment_reply"),
                        //回复名字
                        replyName = document.getElementById("comment_reply_name"),
                        //昵称
                        name = document.getElementById("comment_name"),
                        //邮箱
                        email = document.getElementById("comment_email"),
                        //内容
                        content = document.getElementById("comment_content");
                    axios({
                        method: 'post',
                        url: '/addComment',
                        data: {
                            blogId: blogId,
                            parent: reply.value,
                            userName: name.value,
                            email: email.value,
                            content: content.value,
                            parentName: replyName.value
                        }
                    }).then(function (resp) {
                        alert(resp.data.msg);
                        name.value = '';
                        email.value = '';
                        content.value = '';
                        reply.value = '-1';
                        replyName.value = '0';
                        code.value = '';
                        location.reload();
                    });
                }
            },
            //验证码点击事件
            changeCode: function () {
                return function () {
                    axios({
                        method: 'get',
                        url: '/queryRandomCode'
                    }).then((res) => {
                        // console.log(res.data);
                        this.vCode = res.data.data.data;
                        this.rightCode = res.data.data.text;
                    });
                }
            }
        },
        created: function () {
            this.changeCode();
        }
    }),
    blogComments = new Vue({
        el: '#blog_comments',
        data: {
            total: 0,
            comments: []
        },
        computed: {
            //回复
            reply: function () {
                return function (commentId, userName) {
                    document.getElementById("comment_reply").value = commentId;
                    document.getElementById("comment_reply_name").value = userName;
                    location.href = "#send_comment";
                }
            }
        },
        created: function () {
            axios({
                method: 'post',
                url: '/queryCommentsByBlogId',
                data: {
                    blogId: blogId,
                }
            }).then((res) => {
                // console.log(res);
                this.comments = res.data.data;
                axios({
                    method: 'post',
                    url: '/queryCommentsCountByBlogId',
                    data: {
                        blogId: blogId,
                    }
                }).then((res) => {
                    // console.log(res);
                    this.total = res.data.data[0].total;
                });
            });
        }
    });
