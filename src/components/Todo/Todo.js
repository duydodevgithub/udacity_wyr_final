import React from 'react';
import {handleAddGoal, handleRemoveGoal, handleRemoveTodo, handleAddTodo} from '../../actions/TodoAction';
import {receiveDataAction} from '../../actions/Share';
import { connect } from 'react-redux';


class Goals extends React.Component {
    constructor(props) {
        super(props);
        this.addGoal = this.addGoal.bind(this);
        this.removeGoal = this.removeGoal.bind(this);
    }

    addGoal() {
        const {dispatch} = this.props;
        const elem = document.getElementById("goal");

        dispatch(handleAddGoal(elem.value));

        elem.value = "";

    }

    removeGoal(e, goal) {
        const {dispatch} = this.props;
        e.preventDefault();

        dispatch(handleRemoveGoal(goal));
    }

    render() {
        const {goals} = this.props;
        return(
            <div>
                <h2>Add goals item</h2>
                    <input id='goal' name='goal' placeholder='Add Goals'></input>
                    <button onClick={this.addGoal}>Add Goal</button>
                
                <ul>Goal list
                {goals.map((goal) => (
                        <li key={goal.id}>{goal.name}<button id={goal.id} onClick={(e) => {this.removeGoal(e, goal)}}>Remove</button></li>
                    ))}
                </ul>
            </div>
        )
    }
}

class Item extends React.Component {
    constructor(props) {
        super(props);

        this.addTodo = this.addTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
    }

    addTodo() {
        const {dispatch} = this.props;
        const elem = document.getElementById("todo");

        dispatch(handleAddTodo(elem.value));
        elem.value = "";
    }


    removeTodo(e, todo) {
        const {dispatch} = this.props;
        e.preventDefault();

        dispatch(handleRemoveTodo(todo)); 
    }

    render() {
        const {todos} = this.props;
        return (
            <div>
                <h2>Add to do item</h2>
                    <input id='todo' name='todo' placeholder='Add Todo'></input>
                    <button id='todoBtn' onClick={this.addTodo}>Add Todo</button>
                
                <ul id='todos'>Todo list
                    {todos.map((todo) => (
                        <li key={todo.id}>{todo.name} <button onClick={(e) => {this.removeTodo(e, todo)}}>Remove</button></li>
                    ))}
                </ul>
            </div>
        )
    }
}



const ConnectedItems = connect((state) => ({
    todos: state.todos
  }))(Item)

const ConnectedGoals = connect((state) => ({
goals: state.goals
}))(Goals)

class Todo extends React.Component {
    componentDidMount() {
        const {dispatch} = this.props;

        Promise.all([
            window.API.fetchTodos(),
            window.API.fetchGoals()
        ]).then(([todos, goals]) => {
            dispatch(receiveDataAction(todos, goals));
        })

        // store.subscribe(() => this.forceUpdate());
    }

    render() {
        // const {store} = this.props;
        // const {loading} = store.getState();
        // console.log(todos);

        if(this.props.loading === true) {
            return <h3>Loading...</h3>
        }

        return (
            <div>
                <ConnectedItems />
                <ConnectedGoals />
            </div>
            
        )
    }
}

const ConnectedTodo = connect((store) => ({
    loading: store.loading
}))(Todo);

export default ConnectedTodo;