import React, {Component} from 'react';

class AnotherChild extends Component {
    //默认属性 及属性校验
    static defaultProps = {};
    static propTypes = {};

    //构造函数 可以设置状态
    constructor(props) {
        console.log('3.constructor');
        super(props);
        this.state = {
            childCount: 0
        }
    }

    //从属性中获取状态
    static getDerivedStateFromProps(props, state) {
        console.log('3.getDerivedStateFromProps');
        return null
    }

    //渲染函数
    render() {
        console.log('3.render');
        return (
            <>
                另一个子组件 count的值：{this.state.childCount}
                <button onClick={this.handleClick}>增加count的值</button>
            </>
        );
    }

    //组件挂载完成
    componentDidMount() {
        console.log('3.componentDidMount');
    }

    //state/prop更改
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('3.shouldComponentUpdate');
        return true;
    }

    //获取之前状态快照
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('3.getSnapshotBeforeUpdate');
        return null;
    }

    //组件更新完毕
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('3.componentDidUpdate');
    }

    //组件将要销毁
    componentWillUnmount() {
        console.log('3.componentWillUnmount');
    }

    handleClick = () => {
        this.setState({
            childCount: this.state.childCount + 1
        })
    }
}

export default AnotherChild;
