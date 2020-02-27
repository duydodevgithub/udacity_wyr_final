import React from "react";
import { connect } from 'react-redux';
import {logout} from '../../actions/Auth';
import {
	Link
} from "react-router-dom";

class Nav extends React.Component {
    handleLogout() {
		const {dispatch} = this.props;

		dispatch(logout());
    }
    
    render() {
        return (
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
            </div>
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(Nav);