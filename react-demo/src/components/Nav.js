import React, {Component} from 'react';
import {NavLink,withRouter} from "react-router-dom";
import MenuLink from "./MenuLink";
//实现react-router的withRouter流程
// const withRouter = Component => ()=> <Route component={Component}/>;
class Nav extends Component {
    render() {
        return (
            <div className='nav'>
                <span className='logo' onClick={this.handleClick}>渡一教育</span>
                <NavLink to='/' exact>首页</NavLink>
                <MenuLink to='/activities'>动态</MenuLink>
                <MenuLink to='/topics'>话题</MenuLink>
                <MenuLink to='/login'>登录</MenuLink>
            </div>
        );
    };
    handleClick=()=>{
        // console.log(this.props.history);
        this.props.history.replace('/');
    }
}

export default withRouter(Nav);
