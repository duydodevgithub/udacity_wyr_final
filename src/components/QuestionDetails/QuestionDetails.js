import React from "react";
import {connect} from "react-redux";

class QuestionDetails extends React.Component {
    render() {
        console.log(this.props);
        return(
            <div>
                <p>{this.props.questions[this.props.qid].author}</p>
                <p>
                    {this.props.questions[this.props.qid].optionOne.text}
                    {this.props.questions[this.props.qid].optionOne.votes.length}
                </p>
                <p>
                    {this.props.questions[this.props.qid].optionTwo.text}
                    {this.props.questions[this.props.qid].optionTwo.votes.length}
                </p>
            </div>
        )
    }
}

function mapStateToProps({questions, loading}, {qid}) {
    return {
        loading,
        questions,
        qid
    }
};

export default connect(mapStateToProps)(QuestionDetails);