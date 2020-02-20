import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";


function todos(state = [], action) {
    switch(action.type) {
        case 'ADD_TODO':
            return [...state, action.todo];
        case "REMOVE_TODO":
            return state.filter((todo) => (
                todo.id !== action.removeTodo.id
            ))
        case "RECEIVE_DATA":
            return action.todos
        default:
            return state;
    }
}

function goals(state = [], action) {
    switch(action.type) {
        case 'ADD_GOAL':
            return [...state, action.goal]
        case 'REMOVE_GOAL':
            return state.filter((goal) => (
                goal.id !== action.removeGoal.id
            ))
        case "RECEIVE_DATA":
            return action.goals
        default:
            return state;
    }
}

function loading(state = true, action) {
    switch (action.type) {
        case "RECEIVE_DATA":
            return false;
        default:
            return state;
    }
}

const checker = (store) => (next) => (action) => {
    if(
        action.type === "ADD_TODO" &&
        action.todo.name.toLowerCase().includes('bitcoin')
    ) {
        return alert("Nope. That's a bad idea");
    }
    if(
        action.type === "ADD_GOAL" &&
        action.goal.name.toLowerCase().includes('bitcoin')
    ) {
        return alert("Nope. That's a bad idea");
    }
    
    return next(action);
}

const logger = (store) => (next) => (action) => {
    console.group();
    console.log("Current state: ", store.getState());
    console.log("Current action is: ", action);
    const result = next(action);
    console.log("The new state: ", store.getState());
    console.groupEnd();
    return result;
}

// const thunk = (store) => (next) => (action) => {
//     if(typeof action === "function") {
//         return action(store.dispatch);
//     }

//     return next(action);
// }

const Context = React.createContext();


const store = createStore(combineReducers({
    todos,
    goals,
    loading
}), applyMiddleware(thunk,checker, logger));

// store.subscribe(() => {
//     console.log(store.getState());
// })


ReactDOM.render(<App store={store}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
