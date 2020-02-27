import React from 'react';
import {connect} from "react-redux";
import {loadUserList} from '../../actions/Share';
import {_getUsers} from '../../utils/_DATA';
import Nav from "../Nav";
import {
	Redirect
} from "react-router-dom";


class Leaderboard extends React.Component {
    componentDidMount() {
        const {dispatch} = this.props;

        Promise.all([
            _getUsers()
        ]).then(([users]) => {
            // console.log(users);
            dispatch(loadUserList(users));
        })
    }

    render() {
        if(!this.props.authedUser) {
            return <Redirect to="/" />
        }
        return (
            <div className="container">
                <Nav />
                <div className="row">
                    <div className="col-md-6">
                        <h1>Leader Board</h1>
                        {this.props.users.sort((a,b)=>{
                            return ((Object.keys(b.answers).length + b.questions.length) - (Object.keys(a.answers).length + a.questions.length));
                        }).map((user) => {
                            return (
                                <div key={user.id}>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            {/* <h3 className="panel-title">{user.name}</h3> */}
                                            <div className="media">
                                                <div className="media-left">
                                                <h3 className="media-heading">Welcome {user.name} !</h3>
                                                    <img style={{ "width":"32px", "height":"32px" }} className="media-object" src={user.avatarURL} alt={user.name} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="panel-body">
                                            <table className="table table-bordered table-hover">
                                                <thead>
                                                    <tr className="success">
                                                        <th>Answered Questions</th>
                                                        <th>Created Questions</th>
                                                        <th>Score</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{  Object.keys(user.answers).length }</td>
                                                        <td>{  user.questions.length }</td>
                                                        <td>{  Object.keys(user.answers).length + user.questions.length} </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({loading, users, authedUser}) {
    if(authedUser) {
        return {
            loading,
            users: Object.values(users[0]),
            authedUser
        }
    }
    return {
        loading,
        authedUser
    }
}

export default connect(mapStateToProps)(Leaderboard);