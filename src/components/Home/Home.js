import React from "react";
import {connect} from 'react-redux';
import{handleLoadInitialData} from "../../actions/Share";
import { handleSaveAnswerQuestion } from "../../actions/Question";
import {
	Link
} from "react-router-dom";
import LoadingBar from "react-redux-loading";
import Nav from "../Nav";
import ConnectLogIn from '../Login';

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

        // console.log(this.props);
        if(!this.props.authedUser) {
			return(
				<div>
					<ConnectLogIn />
				</div>
			)
		}
        return(
            <div className="container">
                <LoadingBar />
                <Nav />
                <div className="media">
                    
                    <div className="media-left">
                    <h2 className="media-heading">Welcome {this.props.user.name} !</h2>
                        <img style={{ "width":"64px", "height":"64px" }} className="media-object" src={this.props.user.avatarURL} alt="..." />
                    </div>
                </div>
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
                        <div className="container" style={{ "marginTop": "20px" }}>
                            <div className="row" >

                        {this.props.unAnsweredQuestionIdArr.map((id)=>{
                            let d = new Date(this.props.questions[id].timestamp);
                            let date = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate() +' '+ d.getHours()+':'+ d.getMinutes()+':'+ d.getSeconds();

                            return (
                                        <div className="col-md-4"  key={id}>
                                            {/* <p key={id}>{this.props.questions[id].id}</p> */}
                                            <div className="panel panel-default">
                                                <div className="panel-heading">
                                                    <h3 className="panel-title">Asked by {this.props.questions[id].author}</h3>
                                                    <p>Created at: {date}</p>
                                                </div>
                                                <div className="panel-body">
                                                <form onSubmit={(e) => {this.handleFormSubmit(e, id)}}>
                                                    <p>Would you rather...</p>
                                                    <input type="radio" name="answer" value="optionOne" required/>
                                                    <label className="radio-inline" htmlFor="optionOne">{this.props.questions[id].optionOne.text}?</label><br></br>
                                                    <input type="radio" name="answer" value="optionTwo" />
                                                    <label className="radio-inline" htmlFor="optionTwo">{this.props.questions[id].optionTwo.text}?</label><br></br>
                                                    <div style={{ "marginTop" : "10px" }}>
                                                        <button type="submit" className="btn btn-default pull-right">Submit</button>
                                                        <button className="btn btn-default pull-left"><Link to={`/questionDetail/${id}`}>Question details</Link></button>
                                                    </div>

                                                </form>
                                                </div>
                                            </div>
                                        </div>
                                )
                             })}  
                            </div>
                        </div>

                    </div>

                    <div id="answered" className="tab-pane fade">
                        {/* <h5>Load answered questions here</h5> */}
                        <div className="container" style={{ "marginTop": "20px" }}>
                            <div className="row">
                                {this.props.answeredQuestionIdArr.map((id)=>{
                                    let d = new Date(this.props.questions[id].timestamp);
                                    let date = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate() +' '+ d.getHours()+':'+ d.getMinutes()+':'+ d.getSeconds();

                                    return(
                                        <Link key={id} to={`/questionDetail/${id}`}>
                                            <div className="col-md-6" >
                                                <div className="panel panel-default">
                                                    <div className="panel-heading">
                                                        <h3 className="panel-title">Asked by {this.props.questions[id].author}</h3>
                                                        <p>Created At: {date}</p>

                                                    </div>
                                                    <div className="panel-body">
                                                    <table className="table table-bordered table-hover">
                                                        <tbody>
                                                            <tr>
                                                                <td>{this.props.questions[id].optionOne.text}</td>
                                                                <td>OR</td>
                                                                <td>{this.props.questions[id].optionTwo.text}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </Link>
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

    console.log(questions);
    if(users && questions && authedUser) {
        let sortedQuestions = {};

        Object.values(questions).sort((a,b)=>{
            return  b.timestamp - a.timestamp;
        }).forEach((question) => (
            sortedQuestions[question.id] = question
            ))
        const user = users[0][authedUser];
        const questionIdArr = Object.keys(sortedQuestions);
        const answeredQuestionIdArr = questionIdArr.filter((id) => {
            return Object.keys(user.answers).includes(id);
        }) ;


        const unAnsweredQuestionIdArr = questionIdArr.filter(function(id) { return !answeredQuestionIdArr.includes(id) });
        
        return {
            loading,
            questions,
            user,
            answeredQuestionIdArr,
            unAnsweredQuestionIdArr,
            authedUser
        }
    }
    return {
        loading
    }
    
}

// const ConnectedHome = connect((store) => ({
//     loading: store.loading,
//     authedUser: store.authedUser,
//     questions: store.questions
// }))(Home);

export default connect(mapStateToProps)(Home);