import React from 'react';

class ToDoList extends React.Component {
    // 状态
    state = {
        inpVal: '',
        list: [1, 2, 3],
        count: 0
    };

    /**类组件中必须要有render函数，React看到组件会默认调用render方法。
     * 如果是函数组件会在内部自动的添加一个render方法，把函数的返回结果作为render方法的返回结果。
     * 也就是说函数返回什么就相当于render函数返回什么，所以函数组件不用添加render方法，React不会为类组件添加render方法*/
    render() {
        return (
            <>
                <div>
                    <input type="text" value={this.state.inpVal} onChange={this.handleChange}/>
                    <button onClick={this.handleClick}>添加</button>
                </div>
                <ul>
                    {
                        this.state.list.map((item, index) => (
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
        this.setState({
            inpVal: e.target.value,
        });
    };

    handleClick = () => {
        this.setState({
            list: [...this.state.list, this.state.inpVal],
            inpVa: '',
        });
    };

    handleDelete = index => {
        const list = this.state.list;
        list.splice(index, 1);
        this.setState({
            list,
        });

        /*从等待state中取值,然后在设置,最后赋给state
        this.setState((prevState) => {
            return {
                count: prevState.count + 1
            }
        });*/
    }
}

export default ToDoList;
