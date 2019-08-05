const blogList = new Vue({
    el: '#blog_list',
    data: {
        blogList: []
    },
    computed: {},
    created: function () {
        axios({
            method: 'get',
            url: '/queryAllBlog'
        }).then((res) => {
            // console.log(res);
            this.blogList = res.data.data;
        });
    }
});
