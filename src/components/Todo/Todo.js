import React from 'react';
import {addTodoAction} from '../../actions/addTodoAction';
import { _getUsers } from '../../utils/_DATA';

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const {store} = this.props;

        _getUsers().then((res) => {
            console.log(res);
        });

        store.subscribe(() => this.forceUpdate());
    }


    handleClick(e) {
        e.preventDefault();
        const name = e.target.todo.value;
        this.props.store.dispatch(addTodoAction({name: name}))
    }

    render() {
        const {store} = this.props;
        const {todos} = store.getState();
        console.log(todos);
        return (
            <div>
                <h2>Add to do item</h2>
                <form onSubmit={this.handleClick}>
                    <input id='todo' name='todo' placeholder='Add Todo'></input>
                    <button id='todoBtn'>Add Todo</button>
                </form>
                <ul id='todos'>Todo list
                    {todos.map((todo) => (
                        <li key={todo.name}>{todo.name}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Todo;