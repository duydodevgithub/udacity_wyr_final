import React from 'react';
import './App.css';
// import Todo from './components/Todo';
import ConnectLogIn from './components/Login';
import Leaderboard from './components/Leaderboard';
import ConnectedQuestion from './components/Newquestion';
import Home from './components/Home';
import QuestionDetails from "./components/QuestionDetails";
import {logout} from './actions/Auth';
import {handleLoadInitialData} from "./actions/Share";
// import Todo from './components/Todo';
import { connect } from 'react-redux';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

class App extends React.Component {

	componentDidMount() {
        const {dispatch} = this.props;
        const authedUser = this.props.authedUser;
        // console.log(this.props.authedUser);

        dispatch(handleLoadInitialData(authedUser));
    }

	handleLogout() {
		const {dispatch} = this.props;

		dispatch(logout());
	}

	render() {
		// console.log("auth user here" ,this.props.autheduser);
		if(!this.props.autheduser) {
			return(
				<ConnectLogIn />
			)
		}
		else {
			return(
				<Router>
					<div className='container'>
						<nav className="navbar navbar-default">
							<div className="container-fluid">
								<div className="navbar-header">
									<ul className="nav navbar-nav">
										<li><Link className="nav-item nav-link active" to="/">Home</Link></li>
										<li><Link className="nav-item nav-link" to="/newquestion">New Question</Link></li>
										<li><Link className="nav-item nav-link" to="/leaderboard">Leader Board</Link>	</li>
									</ul>
									<ul className="nav navbar-nav navbar-right">
										{/* <li>Welcome {this.props.autheduser}</li> */}
										<li><Link className="nav-item nav-link" to="/" onClick={(e) => this.handleLogout(e)}>Log Out</Link></li>
									</ul>
								</div>
							</div>
						</nav>
						<Switch>
								<Route exact path="/">
									<Home />
								</Route>
								<Route exact path="/newquestion">
									<ConnectedQuestion />
								</Route>
								<Route exact path="/leaderboard">
									<Leaderboard />
								</Route>
								<Route exact path="/questionDetail/:id" component={QuestionDetails}/>
								<Route component={Home} />

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
