import React from 'react';
import {_getUsers} from '../../utils/_DATA';
import {loadUserList} from '../../actions/Share';
import {auth} from '../../actions/Auth';
import {connect} from 'react-redux';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handlePickUser = this.handlePickUser.bind(this);
    }

    componentDidMount() {
        const {dispatch} = this.props;

        Promise.all([
            _getUsers()
        ]).then(([users]) => {
            // console.log(users);
            dispatch(loadUserList(users));
        })
    }

    handlePickUser(e, userId) {
        const {dispatch} = this.props;

        e.preventDefault();
        console.log(userId);
        //dispatch action to handle authed user here
        dispatch(auth(userId));
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
                {/* <h1>Select a user to login</h1> */}
                <div className="container">
                    <div className="row">
                        {Object.values(this.props.users[0]).map((obj) =>(
                            <div key={obj.id} className="col-md-4">
                                <div className="card" style={{border: "1px solid black", padding: "5px"}}>
                                    <img style={{ height:"200px" }} src={obj.avatarURL} className="card-img-top" alt={ obj.name } />
                                    <div className="card-body">
                                        <h5 className="card-title">{obj.name}</h5>
                                    </div>
                                    <button onClick={(e) => {this.handlePickUser(e, obj.id)}}>Pick</button>
                                </div> 
                            </div>
                               
                        ))}
                    </div>
                    
                </div>
                
                
            </div>
        )
    }
}

const ConnectLogIn = connect((store) => ({
    loading: store.loading,
    users: store.users
}))(Login);

export default ConnectLogIn;