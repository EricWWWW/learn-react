import { observable, computed,action } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';



///////////////////////
// Store

class TodoStore{
    @observable todos = [];
    get completedCount(){
        return this.todos.filter(i => i.completed === false).length;
    }
     addTodo(task){
        this.todos.push({
            task,
            completed:false
        })
    }
}

/////////////////////////
// Component
@observer
class TodoList extends Component{
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        const { todoStore } = this.props;
        todoStore.addTodo(prompt('请输入添加的任务'))
    }

    render(){
        const { todoStore } = this.props;
        return (
            <div>
                {todoStore.todos.map((todo,index) => <Todo todo={todo} key={index} />)}
                <p>未完成数量： { todoStore.completedCount }</p>
                <button onClick={ this.handleClick }>添加新任务</button>
            </div>
        )
    }
}
@observer
class Todo extends Component{
    constructor(){
        super();
        this.toggleCompleted = this.toggleCompleted.bind(this)
    }
    render(){
        const { todo } = this.props;
        return(
            <li>
                <input type="checkbox" checked={ todo.completed } onChange={ this.toggleCompleted }/>
                { ' ' + todo.task + ' '}
            </li>
        )
    }

    toggleCompleted(){
        const todo = this.props.todo;
        todo.completed = !todo.completed;
    }
}





const todoStore1 = new TodoStore();
todoStore1.addTodo('task1');
todoStore1.addTodo('task2');

ReactDOM.render(
    <TodoList todoStore={todoStore1} />,
    document.getElementById('root')
);
