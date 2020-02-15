import React from 'react';
import {_getUsers} from '../../utils/_DATA';

class Login extends React.Component {
    componentDidMount() {
        _getUsers().then((res) => {
            console.log(res);
        })
    }

    render() {
        return (
            <div>
                <h1>login page</h1>
            </div>
        )
    }
}

export default Login;