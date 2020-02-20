import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Todo from './components/Todo';
import * as serviceWorker from './serviceWorker';
import {logger, checker} from './middlewares/Todomiddleware'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {todos, goals, loading } from "./reducers/TodoReducer";
import thunk from "redux-thunk";
import { connect } from 'react-redux';
import { Provider } from 'react-redux';


// const thunk = (store) => (next) => (action) => {
//     if(typeof action === "function") {
//         return action(store.dispatch);
//     }

//     return next(action);
// }

export const Context = React.createContext();

// class Provider extends React.Component {
//     render() {
//         return (
//             <Context.Provider value={this.props.store}>
//                 {this.props.children}
//             </Context.Provider>
//         )
//     }
// }

// class ConnectedTodo extends React.Component {
//     render() {
//         return (
//             <Context.Consumer>
//                 {(store)=>(
//                     <Todo store={store} />
//                 )}
//             </Context.Consumer>
//         )
//     }
// }

const ConnectedTodo = connect((store) => ({
    loadings: store.loading
}))(Todo);

const store = createStore(combineReducers({
    todos,
    goals,
    loading
}), applyMiddleware(thunk,checker, logger));

// store.subscribe(() => {
//     console.log(store.getState());
// })


ReactDOM.render(<Provider store={store}>
    <ConnectedTodo />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
