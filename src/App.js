import React from 'react';
import './App.css';
// import Todo from './components/Todo';
import Login from './components/Login';
import Leaderboard from './components/Leaderboard';
import Newquestion from './components/Newquestion';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";


function App(props) {
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
					
					</div>
				</div>
			</nav>
			<Switch>
					<Route path="/newquestion">
						<Newquestion />
					</Route>
					<Route path="/leaderboard">
						<Leaderboard />
					</Route>
					<Route path="/">
						<Login />
					</Route>
			</Switch>
		</div>
  </Router>
	)
}

export default App;
