import React, {Component} from 'react';

import './style.css';

class Home extends Component {
    authorInput = React.createRef();
    articleInput = React.createRef();

    componentDidMount() {
        const {location} = this.props;
        const articleInfo = location.state && location.state.article;
        if (articleInfo) {
            this.authorInput.current.value = articleInfo.author;
            this.articleInput.current.value = articleInfo.title;
        }
    }

    render() {
        return (
            <div className="home">
                <h4>
                    发表话题：
                </h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-box">
                        <label htmlFor="author">作者姓名：</label>
                        <input id="author" required ref={this.authorInput}/>
                    </div>
                    <div className="form-box">
                        <label htmlFor="article">文章标题：</label>
                        <input id="article" required ref={this.articleInput}/>
                    </div>
                    <button className="confirm-btn">提交</button>
                </form>
            </div>
        )
    };

    // 表单提交
    handleSubmit = e => {
        //阻止默认事件
        e.preventDefault();
        //获取作者、标题信息 生成15位id
        const author = this.authorInput.current.value,
            title = this.articleInput.current.value,
            id = Math.floor(Math.random() * 100000000000000),
            isLogin = document.cookie.includes('login=true'),
            article = {
                author,
                title,
                id
            };
        // console.log(article);
        if (isLogin) {
            this.setArticleStorage(article);
        } else {
            alert('没有登录，不能发表话题，跳转到登录页面');
            this.props.history.replace({
                pathname: '/login',
                state: {article, from: this.props.location.pathname}
            })
        }
        /*isLogin ? this.setArticleStorage(article) : this.props.history.replace({
            pathname: '/login',
            state: {article, from: this.props.location.pathname}
        });*/

    };

    //设置localStorage
    setArticleStorage = article => {
        const articleList = JSON.parse(localStorage.getItem('articleList')) || [];
        articleList.push(article);
        localStorage.setItem('articleList', JSON.stringify(articleList));
        this.jumpToTopics();
    };
    // 跳转页面
    jumpToTopics = () => {
        // console.log(this.props);
        this.props.history.replace('/topics');
    };

}

export default Home;
