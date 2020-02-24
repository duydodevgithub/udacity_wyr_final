import React from "react";
import {connect} from 'react-redux';
import{handleLoadQuestions} from "../../actions/Share";
import { questions } from "../../reducers/QuestionReducer";

class Home extends React.Component {

    componentDidMount() {
        const {dispatch} = this.props;
        const authedUser = this.props.authedUser;
        // console.log(this.props.authedUser);

        dispatch(handleLoadQuestions(authedUser));
    }

    render() {

        console.log(this.props);

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
                {this.props.questionID.map((question) => (
                        <p key={question}>{question}AAA</p>
                    ))}
            </div>
        )
    }
}

function mapStateToProps({loading, authedUser, questions}) {
    return {
        loading,
        authedUser,
        questionID: Object.keys(questions)
    }
}

// const ConnectedHome = connect((store) => ({
//     loading: store.loading,
//     authedUser: store.authedUser,
//     questions: store.questions
// }))(Home);

export default connect(mapStateToProps)(Home);