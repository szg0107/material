//获取地址栏参数
function getQueryString(name) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"),
        r = window.location.search.slice(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

//字体改变颜色
function fontDiscolor() {
    const temp = Array.from(document.getElementsByClassName('discolor'));
    temp.forEach((item) => {
        const red = Math.random() * 255,
            green = Math.random() * 255,
            blue = Math.random() * 255;
        item.style.color = `rgb(${red},${green},${blue})`;
    });
}

fontDiscolor();
setInterval(() => {
    fontDiscolor();
}, 5000);


//随机标签
const randomTags = new Vue({
        el: '#random_tags',
        data: {
            tags: ['DCS黑鲨', 'wordpress', 'css+div数据结构', 'seo', 'vagrant', '模拟航天飞机', 'telnet', 'C语言', 'selenium分区灯泡姑娘', 'C++', 'Sunshine', 'Girl蛋疼个人博客', 'SpaceShuttleMissioncpanel', 'mysql', 'E6', 'python', 'php', 'win7', 'mac', ',独立博客', '树莓派', '博客优化', ',五笔', 'git', '拉登模拟飞行', '外链指针', 'Rewrite音乐', 'dedecms摄像头', '博客', 'php分页', '搞笑', 'nginx', '游戏', 'session', 'laravel伤不起'],
        },
        computed: {
            randomColor: () => {
                return () => {
                    const red = Math.random() * 255,
                        green = Math.random() * 255,
                        blue = Math.random() * 255;
                    return `rgb(${red},${green},${blue})`;
                }
            },
            randomSize: () => {
                return () => {
                    return (Math.random() * 20 + 12) + 'px';
                }
            }
        },
        created: function () {
            //请求数据
            axios({
                method: 'get',
                url: '/queryRandomTags'
            }).then((res) => {
                // console.log(res);
                this.tags = res.data.data;
            });
        }
    }),
    //最近热门
    newHot = new Vue({
        el: '#new_hot',
        data: {
            titleList: [
                {
                    title: '使用码云git的webhook实现生产环境代',
                    link: ''
                },
                {
                    title: 'VirtualBox压缩vmdk、vagrant打包b',
                    link: ''
                },
                {
                    title: '查看你的AWS服务器已使用流量',
                    link: ''
                },
                {
                    title: 'vscode+XDebug调试远程环境(虚拟机',
                    link: ''
                },
                {
                    title: 'python+selenium自动登录qq空间并下载',
                    link: ''
                },
                {
                    title: '抓取摩拜单车车辆位置数据',
                    link: ''
                },
                {
                    title: '初烧盲狙一条铁三角e40',
                    link: ''
                },
                {
                    title: '树莓派安装homebridge小记',
                    link: ''
                },
                {
                    title: 'ubuntu下cmake报错Could NOT fin',
                    link: ''
                },
                {
                    title: '注册谷歌时提示"此电话号码无法用于进',
                    link: ''
                },
            ]
        },
        computed: {},
        created: function () {
            //请求数据
            axios({
                method: 'get',
                url: '/queryHotBlog'
            }).then((res) => {
                // console.log(res);
                this.titleList = res.data.data;
            })
        }
    }),
    //最新评论
    newComments = new Vue({
        el: '#new_comments',
        data: {
            commentList: [
                {
                    name: '小刘',
                    date: '1周前',
                    comment: '服务器租用 网站技术服务提供服务器租用 网站技术服务提供服务器租用 网站技术服务提供 网站技术服务提供服务器租用 网站技术服务提供',
                },
                {
                    name: '小刘',
                    date: '1周前',
                    comment: '服务器租用 网站技术服务提供',
                },
                {
                    name: '小刘',
                    date: '1周前',
                    comment: '服务器租用 网站技术服务提供',
                },
                {
                    name: '小刘',
                    date: '1周前',
                    comment: '服务器租用 网站技术服务提供',
                },
                {
                    name: '小刘',
                    date: '1周前',
                    comment: '服务器租用 网站技术服务提供',
                },
                {
                    name: '小刘',
                    date: '1周前',
                    comment: '服务器租用 网站技术服务提供',
                },
                {
                    name: '小刘',
                    date: '1周前',
                    comment: '服务器租用 网站技术服务提供',
                },
                {
                    name: '小刘',
                    date: '1周前',
                    comment: '服务器租用 网站技术服务提供',
                },
                {
                    name: '小刘',
                    date: '1周前',
                    comment: '服务器租用 网站技术服务提供',
                },
                {
                    name: '小刘',
                    date: '1周前',
                    comment: '服务器租用 网站技术服务提供',
                }, {
                    name: '小刘',
                    date: '1周前',
                    comment: '服务器租用 网站技术服务提供',
                },


            ]
        },
        computed: {},
        created: function () {
            //请求数据
            axios({
                method: 'get',
                url: '/queryNewComments'
            }).then((res) => {
                // console.log(res);
                this.commentList = res.data.data;
            })
        }
    });
