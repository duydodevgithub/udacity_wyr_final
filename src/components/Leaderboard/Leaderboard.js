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
        // console.log(this.props.users);
        return (
            <div>
                <h1>Leader Board</h1>
                {this.props.users.map((user) => {
                    return (
                        <div key={user.id}>
                            <p>User Name: {  user.name }</p>
                            <p>Answered questions: {  Object.keys(user.answers).length }</p>
                            <p>Created questions: {  user.questions.length }</p>
                            <p>Score: {Object.keys(user.answers).length + user.questions.length} </p>
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