//引入React必须是首字母大写的  React渲染过程练习
// import React from 'react';
// import ReactDOM from 'react-dom';


/**利用jsx 语法生成dom元素
 * jsx =>js+xml(html)
 * 参数1类型  参数2属性 从第三个参数开始都是子元素
 * React.createElement(type,props,children...)
 * 渲染流程
 * jsx=>React.createElement(type,props,children...)=>vNode对象(描述当前元素)=>渲染在页面上*/

// const div = <div>杉杉</div>;
//将元素放到页面中进行渲染   参数1虚拟dom,  参数2容器
// ReactDOM.render(div, document.getElementById('root'));


const React = {
    createElement(type, props, ...children) {
        return {
            type,
            props,
            children
        }
    }
};

const div = <div id='demo'>杉杉<span id='desc'>最美</span></div>;
console.log(div);

const render = (vNode, container) => {
    //如果虚拟dom是字符串 直接创建文本节点并添加到容器
    if (typeof vNode === 'string') {
        const text = document.createTextNode(vNode);
        return container.appendChild(text);
    }
    //解构虚拟dom对象
    const {type, props, children} = vNode,
        //创建一个标签
        ele = document.createElement(type);
    //给标签设置属性
    for (const key in props) {
        if (key.startsWith('__')) {
            break;
        }
        ele.setAttribute(key, props[key]);
    }
    //遍历children并给children属性赋值
    children.forEach(temp => {
        render(temp, ele);
    });
    //将标签添加到容器中
    container.appendChild(ele);
};

render(div, window.root);
