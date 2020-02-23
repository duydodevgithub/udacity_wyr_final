import React from "react";
import {connect} from 'react-redux';
import {_getQuestions} from "../../utils/_DATA";

class Home extends React.Component {

    componentDidMount() {
        // const {dispatch} = this.props;

        Promise.all([
            _getQuestions()
        ]).then(([questions]) => {
            console.log(questions);
            // dispatch(loadUserList(questions));
        })
    }

    render() {
        return(
            <div>
                <h3>Home page</h3>
            </div>
        )
    }
}


const ConnectedHome = connect((store) => ({
    loading: store.loading
}))(Home);

export default ConnectedHome;