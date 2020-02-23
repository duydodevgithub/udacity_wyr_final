import React from 'react';
import './App.css';
// import Todo from './components/Todo';
import ConnectLogIn from './components/Login';
import Leaderboard from './components/Leaderboard';
import ConnectedQuestion from './components/Newquestion';
import ConnectedHome from './components/Home';
import {logout} from './actions/Auth';
// import Todo from './components/Todo';
import { connect } from 'react-redux';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

class App extends React.Component {

	handleLogout() {
		const {dispatch} = this.props;

		dispatch(logout());
	}

	render() {
		// console.log("auth user here" ,this.props.autheduser);
		if(this.props.autheduser.length === 0) {
			return(
				<ConnectLogIn />
			)
		}
		else {
			return(
				<Router>
					<div className='container'>
						<nav className="navbar navbar-expand-lg navbar-light bg-light">
							<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
								<span className="navbar-toggler-icon"></span>
							</button>
							<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
								<div className="navbar-nav">
									<Link className="nav-item nav-link active" to="/">Home</Link>
									<Link className="nav-item nav-link" to="/newquestion">New Question</Link>
									<Link className="nav-item nav-link" to="/leaderboard">Leader Board</Link>	
									{/* <Link className="nav-item nav-link" to="/todoapp">Todo App</Link>	 */}
									{/* <Link className="nav-item nav-link" onClick={(e) => this.handleLogout(e)}>Log Out</Link> */}
									<button onClick={(e) => this.handleLogout(e)}>Log out</button>
								</div>
							</div>
						</nav>
						<Switch>
								<Route exact path="/">
									<ConnectedHome />
								</Route>
								<Route exact path="/newquestion">
									<ConnectedQuestion />
								</Route>
								<Route exact path="/leaderboard">
									<Leaderboard />
								</Route>
								{/* <Route exact path="/">
									<ConnectLogIn />
								</Route> */}
								{/* <Route exact path="/todoapp">
									<Todo />
								</Route> */}
						</Switch>
					</div>
				</Router>
			)
		}
		
	}
}

const ConnectedApp = connect((store) => ({
	loading: store.loading,
	autheduser: store.authedUser,
	todos: store.todos
}))(App);

export default ConnectedApp;
