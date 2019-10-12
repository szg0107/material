import React from 'react';
class ChildLifeCycle extends React.Component{
    render() {
        console.log('2.render');
        return (
            <>子组件</>
        );
    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('2.WillReceiveProps');
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('2.shouldComponentUpdate');
        return true
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('2.componentWillUpdate');
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('2.componentDidUpdate');
    }
    componentWillUnmount() {
        console.log('2.componentWillUnmount');
    }
}
export default ChildLifeCycle
