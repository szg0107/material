import React from 'react';
import TodoItem from "./TodoItem";

class TodoList extends React.Component {
    render() {
        return (
            <ul>
                {
                    this.props.list.map((item,index)=>
                        // {/*<li key={item+index}>{item}</li>*/},
                        <TodoItem key={item+index} item={item} deleteTask={this.props.deleteTask} index={index}/>
                    )
                }

            </ul>
        );
    }
}

export default TodoList;
