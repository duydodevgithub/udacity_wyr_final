import React from "react";
import {connect} from "react-redux";
import {
	Redirect
} from "react-router-dom";
import Nav from "../Nav";

class QuestionDetails extends React.Component {
    
    render() {

        if(!this.props.authedUser) {
            return <Redirect to="/" />
        }

        console.log(this.props);
        const question = this.props.questions[this.props.id.params.id];
        let d = new Date(question.timestamp);
        let date = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate() +' '+ d.getHours()+':'+ d.getMinutes()+':'+ d.getSeconds();

        return(
            <div className="container">
                <Nav />
                <div className="row">
                    <div className="col-md-6">                
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Asked by {question.author}</h3>
                                <p>Created At: {date}</p>
                            </div>
                            <div className="panel-body">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr className="success">
                                        <th></th>
                                        <th>{question.optionOne.text}</th>
                                        <th>{question.optionTwo.text}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>                                        
                                        <td>Vote number</td>
                                        <td>{question.optionOne.votes.length}</td>
                                        <td>{question.optionTwo.votes.length}</td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                        </div>
                </div>
            </div>
            
        )
    }
}

function mapStateToProps({questions, loading, authedUser} , props) {
    const id = props.match
    return {
        loading,
        questions,
        id,
        authedUser
        
    }
};

export default connect(mapStateToProps)(QuestionDetails);