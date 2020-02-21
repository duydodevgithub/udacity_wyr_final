import React from 'react';
import './App.css';
// import Todo from './components/Todo';
import ConnectLogIn from './components/Login';
import Leaderboard from './components/Leaderboard';
import Newquestion from './components/Newquestion';
import Todo from './components/Todo';
import { connect } from 'react-redux';


import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

const ConnectedApp = connect((store) => ({
    loading: store.loading
}))(App);

function App() {
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
							<Link className="nav-item nav-link" to="/todoapp">Todo App</Link>								
							
						</div>
					</div>
				</nav>
				<Switch>
						<Route exact path="/newquestion">
							<Newquestion />
						</Route>
						<Route exact path="/leaderboard">
							<Leaderboard />
						</Route>
						<Route exact path="/">
							<ConnectLogIn />
						</Route>
						<Route exact path="/todoapp">
							<Todo />
						</Route>
				</Switch>
			</div>
		</Router>
	)
}

export default ConnectedApp;
