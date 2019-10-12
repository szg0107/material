//类组件
import React from 'react';
import store from "../store";
import * as actionTypes from '../store/actionTypes';
import * as actionCreators from '../store/actionCreators';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

class ToDoList extends React.Component {
    // 状态
    state = {
        //获取store中的数据
        /*inpVal: store.getState().inpVal,
        list: store.getState().list,*/
        count: 0
    };

    /*componentDidMount() {
        //调用订阅函数在页面上显示
        store.subscribe(() => {
            this.setState({
                inpVal: store.getState().inpVal,
                list: store.getState().list,
            });
        });
    }*/

    /**类组件中必须要有render函数，React看到组件会默认调用render方法。
     * 如果是函数组件会在内部自动的添加一个render方法，把函数的返回结果作为render方法的返回结果。
     * 也就是说函数返回什么就相当于render函数返回什么，所以函数组件不用添加render方法，React不会为类组件添加render方法*/
    render() {
        //用react-redux方式获取state
        const {inpVal,list}=this.props;
        return (
            <>
                <div>
                    {/*<input type="text" value={this.state.inpVal} onChange={this.handleChange}/>*/}
                    <input type="text" value={inpVal} onChange={this.handleChange}/>
                    <button onClick={this.handleClick}>添加</button>
                </div>
                <ul>
                    {
                        // this.state.list.map((item, index) => (
                        list.map((item, index) => (
                            <li key={item}>
                                {item}
                                <button onClick={() => {
                                    this.handleDelete(index)
                                }}>X
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </>
        );
    };

    handleChange = e => {
        // console.log(e);
        /*this.setState({
            inpVal: e.target.value,
        });*/
        //更改redux中数据对象
        /*const action = {
            type: actionTypes.CHANGE_INPUT_VAL,
            value: e.target.value,
        };*/
        //调用dispatch方法告知整理数据对象更改数据
        // store.dispatch(actionCreators.setValue(actionTypes.CHANGE_INPUT_VAL,e.target.value));
        //使用mapDispatchToProps方式调用方法
        // this.props.changeValue(e.target.value);
        //使用bindActionCreators简化mapDispatchToProps调用方法
        this.props.setValue(actionTypes.CHANGE_INPUT_VAL,e.target.value);
    };

    handleClick = () => {
        /*this.setState({
            list: [...this.state.list, this.state.inpVal],
            inpVa: '',
        });*/
        /*const action = {
            type: actionTypes.ADD_TODO_ITEM,
            value: this.state.inpVal
        };*/
        // store.dispatch(actionCreators.setValue(actionTypes.ADD_TODO_ITEM,this.state.inpVal));
        // this.props.addItem(this.props.inpVal);
        this.props.setValue(actionTypes.ADD_TODO_ITEM,this.props.inpVal);
    };

    handleDelete = index => {
        /*const list = this.state.list;
        list.splice(index, 1);
        this.setState({
            list,
        });*/
        /*const action = {
            type: actionTypes.DELETE_TODO_ITEM,
            index
        };*/
        // store.dispatch(actionCreators.deleteItem(actionTypes.DELETE_TODO_ITEM,index));
        // this.props.deleteItem(index);
        this.props.deleteItem(actionTypes.DELETE_TODO_ITEM,index);

        /*从等待state中取值,然后在设置,最后赋给state
        this.setState((prevState) => {
            return {
                count: prevState.count + 1
            }
        });*/
    }
}
const mapStateToProps=(state)=>({
    inpVal:state.inpVal,
    list:state.list
});

/**bindActionCreators()绑定动作创建者可以精简 mapDispatchToProps
 * 有两个参数 第一个参数所有动作集合 第二个参数dispatch
 * 利用这个函数可以得到一个返回值相当于({
    changeValue:(value)=>{
        dispatch(actionCreators.setValue(actionTypes.CHANGE_INPUT_VAL,value));
    }
})
 * */
/*const mapDispatchToProps=(dispatch)=>({
    changeValue:(value)=>{
        dispatch(actionCreators.setValue(actionTypes.CHANGE_INPUT_VAL,value));
    },
    addItem:(value)=>{
        dispatch(actionCreators.setValue(actionTypes.ADD_TODO_ITEM,value));
    },
    deleteItem:(index)=>{
        dispatch(actionCreators.setValue(actionTypes.DELETE_TODO_ITEM,index));
    }
});*/
// const mapDispatchToProps=(dispatch)=> bindActionCreators(actionCreators,dispatch);
/**用connect包装一下
 * 有两个参数mapStateToProps 遍历属性放进Props中
 *           mapDispatchToProps 遍历分发任务放进Props中 可以直接传入任务对象
* */
export default connect(mapStateToProps,actionCreators)(ToDoList);
