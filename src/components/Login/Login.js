import React from 'react';
import {_getUsers} from '../../utils/_DATA';
import {loadUserList} from '../../actions/Share';
import {connect} from 'react-redux';

class Login extends React.Component {
    componentDidMount() {
        const {dispatch} = this.props;

        Promise.all([
            _getUsers()
        ]).then(([users]) => {
            console.log(users);
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
                <h1>Welcome</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Select Account to Login</label>
                        <select className="form-control" id="exampleFormControlSelect1">
                         {Object.values(this.props.users[0]).map((obj) =>(
                             <option key={obj.id}>{obj.name}</option>
                         ))}
                        </select>
                    </div>
                </form>
            </div>
        )
    }
}

const ConnectLogIn = connect((store) => ({
    loading: store.loading,
    users: store.users
}))(Login);

export default ConnectLogIn;