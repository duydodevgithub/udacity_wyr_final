import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ConnectedApp from './App';
import * as serviceWorker from './serviceWorker';
import {logger, checker} from './middlewares/Todomiddleware'
import { createStore, combineReducers, applyMiddleware } from 'redux';
// import {todos, goals, loading } from "./reducers/TodoReducer";
import { loading } from "./reducers/TodoReducer";

import {users} from "./reducers/InitialData";
import {authedUser} from "./reducers/AuthReducer";
import {questions} from "./reducers/QuestionReducer";
import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import { loadingBarReducer } from "react-redux-loading";


const store = createStore(combineReducers({
    // todos,
    // goals,
    loading,
    users,
    authedUser,
    questions,
    loadingBar: loadingBarReducer
}), applyMiddleware(thunk,logger,checker));

// store.subscribe(() => {
//     console.log(store.getState());
// })


ReactDOM.render(<Provider store={store}>
    <ConnectedApp />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
