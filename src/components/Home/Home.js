import React from "react";
import {connect} from 'react-redux';
import{handleLoadQuestions} from "../../actions/Share";

class Home extends React.Component {

    componentDidMount() {
        const {dispatch} = this.props;
        const authedUser = this.props.authedUser[0].id;

        dispatch(handleLoadQuestions(authedUser));
    }

    render() {
        const questions = this.props.questions;

        console.log(questions[0]);

        if(this.props.loading === true) {
            return (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            )
        }
        return(
            <div>
                <h3>Load unanswered question of authed user here</h3>
                {this.props.questions.map((question) => (
                    <p key={Date}>{question.author}test</p>
                )) 
                }
            </div>
        )
    }
}

const ConnectedHome = connect((store) => ({
    loading: store.loading,
    authedUser: store.authedUser,
    questions: store.questions
}))(Home);

export default ConnectedHome;