import React from 'react';
import './App.css';
// import Todo from './components/Todo';
import Login from './components/Login';
import Leaderboard from './components/Leaderboard';
import Newquestion from './components/Newquestion';
import Todo from './components/Todo';


import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";



function App(props) {
	return(
			(store) =>(
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
									<Link className="nav-item nav-link" to="/todos">Todo App</Link>
								
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
									<Login />
								</Route>
								<Route exact path="/todos">
									<Todo store={props.store} />
								</Route>
						</Switch>
					</div>
		 		 </Router>
			)
	
	)
}

export default App;
