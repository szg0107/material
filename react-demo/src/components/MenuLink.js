//自定义菜单组件
import React from 'react';
import {Route} from 'react-router-dom';

const MenuLink = ({to, ...props}) => {
    /* children相当于render props.children 显示标签间的内容
    * component:只去渲染一个组件，并且路径要匹配
    * render:匹配路径时,渲染render的返回值
    * children:不管路径匹不匹配都去渲染*/
    return (<Route path={to} {...props}
                   children={(p) => {
                       return (
                           <span onClick={() => {
                               p.history.replace(to)
                           }} className={p.match ? 'active' : ''}>{props.children}</span>
                       )
                   }}
    />)
};


export default MenuLink;
