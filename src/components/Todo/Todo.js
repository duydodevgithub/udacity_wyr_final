import React from 'react';
import {addTodoAction, addGoalAction, removeTodoAction, removeGoalAction, receiveDataAction} from '../../actions/TodoAction';


class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.addTodo = this.addTodo.bind(this);
        this.addGoal = this.addGoal.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.removeGoal = this.removeGoal.bind(this);
    }

    componentDidMount() {
        const {store} = this.props;

        Promise.all([
            window.API.fetchTodos(),
            window.API.fetchGoals()
        ]).then(([todos, goals]) => {
            store.dispatch(receiveDataAction(todos, goals));
        })

        store.subscribe(() => this.forceUpdate());
    }


    addTodo() {
        const {dispatch} = this.props.store;

        const elem = document.getElementById("todo");

        dispatch(addTodoAction({name: elem.value}));

        elem.value = "";
    }

    addGoal() {
        const {dispatch} = this.props.store;

        const elem = document.getElementById("goal");

        dispatch(addGoalAction({name: elem.value}));

        elem.value = "";

    }

    removeTodo(e, id) {
        const {dispatch} = this.props.store;
        e.preventDefault();
        dispatch(removeTodoAction({id}));
    }

    removeGoal(e, id) {
        const {dispatch} = this.props.store;
        e.preventDefault();

        dispatch(removeGoalAction(id));
    }

    render() {
        const {store} = this.props;
        const {todos, goals, loading} = store.getState();
        // console.log(todos);

        if(loading === true) {
            return <h3>Loading...</h3>
        }

        return (
            <div>
                <div>
                    <h2>Add to do item</h2>
                        <input id='todo' name='todo' placeholder='Add Todo'></input>
                        <button id='todoBtn' onClick={this.addTodo}>Add Todo</button>
                    
                    <ul id='todos'>Todo list
                        {todos.map((todo) => (
                            <li key={todo.id}>{todo.name} <button onClick={(e) => {this.removeTodo(e, todo.id)}}>Remove</button></li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2>Add goals item</h2>
                        <input id='goal' name='goal' placeholder='Add Goals'></input>
                        <button onClick={this.addGoal}>Add Goal</button>
                    
                    <ul>Goal list
                    {goals.map((goal) => (
                            <li key={goal.id}>{goal.name}<button id={goal.id} onClick={(e) => {this.removeGoal(e, goal.id)}}>Remove</button></li>
                        ))}
                    </ul>
                </div>
            </div>
            
        )
    }
}

export default Todo;