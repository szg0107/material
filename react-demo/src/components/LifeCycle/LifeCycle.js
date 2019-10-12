// 生命周期练习
import React, {Component} from 'react';
// import ChildLifeCycle from "./ChildLifeCycle";
import AnotherChild from "./AnotherChild";
//16.3版本移除了componentWillMount、componentWillReceiveProps、componentWillUpdate
class MyComponent extends Component {
    static defaultProps = {};
    static propTypes = {};

    //构造函数 可以设置状态
    constructor(props) {
        console.log('1.constructor');
        super(props);
        this.state = {
            count: 0
        }
    }

    //挂载前触发的函数 官方不建议在其中使用ajax，16.3版本已被移除
    componentWillMount() {
        console.log('1.willMont');
    }

    //挂载后 只执行一次 可以发送ajax、setState
    componentDidMount() {
        console.log('1.didMont');
    }

    //参数改变
    componentWillReceiveProps(nextProps) {
        console.log('1.WillReceiveProps');
    }

    //组件是否更新
    shouldComponentUpdate(nextProps, nextState) {
        console.log('1.shouldComponentUpdate');
        return true;
    }

    //组件更新前
    componentWillUpdate(nextProps, nextState) {
        console.log('1.WillUpdate');
    }

    //组件更新后
    componentDidUpdate(prevProps, prevState) {
        console.log('1.DidUpdate');
    }

    //组件卸载前
    componentWillUnmount() {
        console.log('1.WillUnmount');
    }

    //组件渲染
    render() {
        console.log('1.render');
        return (
            <>
                <div>
                    count的值：{this.state.count}
                    <button onClick={this.handleClick}>增加count的值</button>
                </div>
                {this.state.count === 0 ? <AnotherChild count={this.state.count}/> : ''}
            </>
        );
    }

    handleClick = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
}


export default MyComponent;
