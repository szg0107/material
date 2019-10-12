import React from 'react';
import {Consumer} from './context'

class TodoItem extends React.Component {
    render() {
        const {item, index} = this.props;
        return (
            //需要定义一个方法接收传过来的参数
            <Consumer>
                {
                    ({deleteTask}) =>
                        <li>
                            {item}
                            <button onClick={() => {
                                deleteTask(index);
                            }}>X
                            </button>
                        </li>
                }

            </Consumer>
        );
    };

    handleDelete = index => {
        this.props.deleteTask(index);
    }
}

export default TodoItem;
