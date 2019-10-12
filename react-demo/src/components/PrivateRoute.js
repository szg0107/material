//路由校验
import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...props}) => {
    //返回渲染的页面
    return (
        //拿到参数
        <Route  {...props}
                render={(props) => {
                    //从cookie中获取登录状态
                    const isLogin = document.cookie.includes('login=true');
                    if (isLogin) {
                        return <Component/>
                    } else {
                        alert('你还没有登录，需转至登录页进行登录');
                        return <Redirect to={
                            {
                                pathname: '/login',
                                state:{
                                    from:props.location.pathname,
                                }
                            }
                        }/>
                    }
                }}
        />
    )
};
export default PrivateRoute;
