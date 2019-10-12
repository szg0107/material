//引入React必须是首字母大写的 jsx中的js和html router练习
import React from 'react';
import ReactDOM from 'react-dom';
// 引入浏览器路由及路径
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import App from "./App";
//首页
import Home from "./pages/home/Home";
//动态
import Activities from "./pages/activities/Activities";
//话题
import Topics from "./pages/topics/Topics";
//登录
import Login from "./pages/login/Login";
//详情页
import Article from "./pages/article/Article";
//路由验证
import PrivateRoute from "./components/PrivateRoute";
//错误页面
import NoMatch from "./pages/noMatch/NoMatch";

ReactDOM.render(
    <Router>
        <App>
            <Switch>
                <Route path='/' component={Home} exact/>
                <Route path='/activities' component={Activities}/>
                {/*<Route path='/topics' component={Topics}/>*/}
                <PrivateRoute path='/topics' component={Topics}/>
                <Route path='/login' component={Login}/>
                <Route path='/article/:id' component={Article}/>
                <Route path='/noMath' component={NoMatch}/>
                <Redirect to='/noMath'/>
            </Switch>
        </App>
    </Router>, document.getElementById('root'));

