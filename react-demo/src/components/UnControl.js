import React from 'react';

/*受控组件*/
class UnControl extends React.Component {
    state = {
        list: []
    };

    render() {
        return (
            <>
                <div>
                    taskA：
                    {/**相当于在UnControl里定义taskA=<input>
                    *或者taskA=React.createRef();16.3之后才有的方法
                     *组件中直接ref={this.taskA}
                     * 方法中通过this.taskA.current获取dom对象*/}
                    <input type="text" ref={dom => {
                        this.taskA = dom
                    }}/>
                    <button name="taskA" onClick={this.handleClick}>添加A任务</button>
                </div>
                <div>
                    taskB：
                    <input type="text" name="taskB" ref={dom => {
                        this.taskB = dom
                    }}/>
                    <button name="taskB" onClick={this.handleClick}>添加B任务</button>
                </div>
                <ul>
                    {
                        this.state.list.map((item, index) => (
                            <li key={item + index}>{item}</li>
                        ))
                    }
                </ul>
            </>);
    };

    handleClick = e => {
        // console.log(this.taskA.value);
        const type = e.target.name;
        let task = this[type].value;
        switch (type) {
            case 'taskA':
                task = `任务A：${task}`;
                break;
            case 'taskB':
                task = `任务B：${task}`;
                break;
            default:
                break;
        }
        this[type].value = '';
        this.setState({
            list: [...this.state.list, task],
        })

    };
}

export default UnControl;
