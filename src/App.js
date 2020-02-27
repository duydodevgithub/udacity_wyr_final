import React from 'react';
import './App.css';
// import Todo from './components/Todo';
import Leaderboard from './components/Leaderboard';
import ConnectedQuestion from './components/Newquestion';
import Home from './components/Home';
import QuestionDetails from "./components/QuestionDetails";
import {logout} from './actions/Auth';
import {handleLoadInitialData} from "./actions/Share";
// import Todo from './components/Todo';
import NotFound from "./components/NotFound";
import { connect } from 'react-redux';
import {loadUserList} from './actions/Share';
import {_getUsers} from './utils/_DATA';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";


class App extends React.Component {

	componentDidMount() {
        const {dispatch} = this.props;
        // console.log(this.props.authedUser);

		dispatch(handleLoadInitialData());
		Promise.all([
            _getUsers()
        ]).then(([users]) => {
            // console.log(users);
            dispatch(loadUserList(users));
        })
    }

	handleLogout() {
		const {dispatch} = this.props;

		dispatch(logout());
	}

	render() {
		// console.log("auth user here" ,this.props.autheduser);
		
		
			return(
				<Router>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="/newquestion">
							<ConnectedQuestion />
						</Route>
						<Route path="/leaderboard">
							<Leaderboard />
						</Route>
						<Route path="/questionDetail/:id" component={QuestionDetails}/>
						<Route>
							<NotFound />
						</Route>
						{/* <Route exact path="/todoapp">
							<Todo />
						</Route> */}
					</Switch>
				</Router>
			)
		}
		
}


const ConnectedApp = connect((store) => ({
	loading: store.loading,
	autheduser: store.authedUser,
	todos: store.todos,
	users: store.users
}))(App);

export default ConnectedApp;
