import React from "react";
import {connect} from 'react-redux';
import{handleLoadInitialData} from "../../actions/Share";
import { handleSaveAnswerQuestion } from "../../actions/Question";
import QuestionDetails from "../QuestionDetails";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(e, id) {
        e.preventDefault();
        const {dispatch} = this.props;
        const authedUser =this.props.user.id;

        console.log(authedUser, id, e.target.answer.value);

        dispatch(handleSaveAnswerQuestion({authedUser, qid: id, answer: e.target.answer.value}));

        // this.forceUpdate();
    }

    componentDidMount() {
        const {dispatch} = this.props;
        // const authedUser = this.props.authedUser;
        dispatch(handleLoadInitialData());
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
                        {/* <h5>Load unanswered questions here</h5>   */}
                        <div className="container">
                            <div className="row" >

                        {this.props.unAnsweredQuestionIdArr.map((id)=>{
                            return (
                                        <div className="col-md-4"  key={id}>
                                            <h5>Asked by: {this.props.questions[id].author}</h5>
                                            <h6>Would you rather?</h6>
                                            <form onSubmit={(e) => {this.handleFormSubmit(e, id)}}>
                                                <input type="radio" name="answer" value="optionOne" required/>
                                                <label htmlFor="optionOne">{this.props.questions[id].optionOne.text}</label><br></br>
                                                <input type="radio" name="answer" value="optionTwo" />
                                                <label htmlFor="optionTwo">{this.props.questions[id].optionTwo.text}</label><br></br>
                                                <button>Submit</button>
                                            </form>
                                            {/* <p key={id}>{this.props.questions[id].id}</p> */}
                                        </div>
                                )
                             })}  
                            </div>
                        </div>

                    </div>

                    <div id="answered" className="tab-pane fade">
                        <h5>Load answered questions here</h5>
                        <div className="container">
                            <div className="row">
                                {this.props.answeredQuestionIdArr.map((id)=>{
                                    return(
                                        <div className="col-md-4" key={id}>
                                            <p >{this.props.questions[id].timestamp}</p>
                                            <QuestionDetails qid={id}/>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        
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