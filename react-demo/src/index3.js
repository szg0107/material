//引入React必须是首字母大写的 jsx中的js和html   组件 生命周期练习
import React from 'react';
import ReactDOM from 'react-dom';
// import Person from "./components/Person";
// import UnControl from "./components/UnControl";
// import TodoWrapper from "./components/interaction/TodoWrapper";
import LifeCycle from './components/LifeCycle/LifeCycle'

/**利用jsx 语法生成dom元素
 * jsx =>js+xml(html)
 * 参数1类型  参数2属性 从第三个参数开始都是子元素
 * React.createElement(type,props,children...)
 * jsx=>React.createElement(type,props,children...)=>vNode对象(描述当前元素)=>渲染在页面上*/

/*const topList = [
    {
        id: 0,
        title: '老年人才用9键',
        new: true,
        hot: '46万'
    },
    {
        id: 1,
        title: '人贩子张维平死刑',
        new: true,
        hot: '44万'
    },
    {
        id: 2,
        title: '全国冻哭预警地图',
        new: false,
        hot: '35万'
    },
    {
        id: 3,
        title: '沈梦辰晒婚纱照',
        new: false,
        hot: '33万'
    },
    {
        id: 4,
        title: '恋爱4个月胖50近',
        new: true,
        hot: '32万'
    },
    {
        id: 5,
        title: '郭麒麟初中早恋',
        new: false,
        hot: '25万'
    },
    {
        id: 6,
        title: '男孩滑雪遭遇雪崩',
        new: true,
        hot: '24万'
    },
    {
        id: 7,
        title: '大熊猫玩菜刀',
        new: false,
        hot: '24万'
    },
    {
        id: 8,
        title: '姿态宣布退役',
        new: false,
        hot: '22万'
    },
    {
        id: 9,
        title: '卫龙辣条吃出虫子',
        new: false,
        hot: '20万'
    },
    {
        id: 10,
        title: '女生被罚抱头蹲',
        new: true,
        hot: '20万'
    }
];*/

/*const person = {
    name: '杉杉',
    age: 18,
    sex: '女',
    figure: {
        weight: 95,
        height: 165
    },
    hobby: ['读书', '看报'],
    salary: 100
};*/
//将元素放到页面中进行渲染   参数1虚拟dom,  参数2容器
ReactDOM.render(<LifeCycle />, document.getElementById('root'));

