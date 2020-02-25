import React from "react";
import {connect} from "react-redux";

class QuestionDetails extends React.Component {
    render() {
        console.log(this.props);
        return(
            <div>
                {this.props.questions[this.props.qid].author}
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