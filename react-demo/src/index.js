//redux练习
import React from 'react';
import { render } from 'react-dom';
//优化引用store中数据过程 连接react和redux的库 <Provider>+connect
import { Provider } from 'react-redux';
import ToDoList from "./components/ToDoList";
import store from './store';

render(<Provider store={store}><ToDoList/></Provider>, document.getElementById('root'));
