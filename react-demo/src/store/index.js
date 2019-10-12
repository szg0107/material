//引用创建商店的方法
import {createStore} from "redux";
//整理数据的对象
import reducer from "./reducer";
//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()使浏览器使用redux DEVTools 创建store
const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;
