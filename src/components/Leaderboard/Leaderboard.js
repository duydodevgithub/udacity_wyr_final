import React from 'react';
import {connect} from "react-redux";
import {loadUserList} from '../../actions/Share';
import {_getUsers} from '../../utils/_DATA';


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
        if(this.props.loading === true) {
            return (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            )
        }
        return (
            <div>
                <h1>Leader Board</h1>
                {this.props.users.sort((a,b)=>{
                    return ((Object.keys(b.answers).length + b.questions.length) - (Object.keys(a.answers).length + a.questions.length));
                }).map((user) => {
                    return (
                        <div key={user.id}>
                            
                            <div className="card" style={{width: '18rem', border: "1px solid black", padding: "5px"}}>
                                <div className="card-body">
                                    <h5 className="card-title">{user.name}</h5>
                                    <p>Answered questions: {  Object.keys(user.answers).length }</p>
                                    <p>Created questions: {  user.questions.length }</p>
                                    <p>Score: {Object.keys(user.answers).length + user.questions.length} </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

function mapStateToProps({loading, users}) {
    return {
        loading,
        users: Object.values(users[0])
    }
}

export default connect(mapStateToProps)(Leaderboard);