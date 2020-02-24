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
            <div className="container">
                <h2>Welcome {this.props.user.name}</h2>

                <ul className="nav nav-tabs">
                    <li className="active">
                        <a data-toggle="tab" href="#unanswered">Unanswered Questions</a>
                    </li>
                    <li>
                        <a data-toggle="tab" href="#answered">Answered Questions</a>
                    </li>
                </ul>

                <div className="tab-content">
                    <div id="unanswered" className="tab-pane fade in active">
                        <h5>Load unanswered questions here</h5>       
                        {this.props.unAnsweredQuestionIdArr.map((id)=>{
                            return (
                            <p key={id}>{this.props.questions[id].id}</p>
                            )
                        })}             
                    </div>

                    <div id="answered" className="tab-pane fade">
                        <h5>Load answered questions here</h5>
                        {this.props.answeredQuestionIdArr.map((id)=>{
                            return(
                            <p key={id}>{this.props.questions[id].timestamp}</p>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({loading, authedUser, questions, users}) {
    const user = users[0][authedUser];
    const answeredQuestionIdArr = Object.keys(user.answers);
    const questionIdArr = Object.keys(questions);

    const unAnsweredQuestionIdArr = questionIdArr.filter(function(obj) { return answeredQuestionIdArr.indexOf(obj) === -1; });


    return {
        loading,
        questions,
        user,
        answeredQuestionIdArr,
        unAnsweredQuestionIdArr

    }
}

// const ConnectedHome = connect((store) => ({
//     loading: store.loading,
//     authedUser: store.authedUser,
//     questions: store.questions
// }))(Home);

export default connect(mapStateToProps)(Home);