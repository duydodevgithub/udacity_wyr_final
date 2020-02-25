import React from "react";
import {connect} from "react-redux";

class QuestionDetails extends React.Component {
    
    render() {
        console.log(this.props);
        return(
            <div>
                test
                
                <p>{this.props.questions[this.props.id.params.id].author}</p>
                <p>
                    {this.props.questions[this.props.id.params.id].optionOne.text}
                    {this.props.questions[this.props.id.params.id].optionOne.votes.length}
                </p>
                <p>
                    {this.props.questions[this.props.id.params.id].optionTwo.text}
                    {this.props.questions[this.props.id.params.id].optionTwo.votes.length}
                </p>
            </div>
        )
    }
}

function mapStateToProps({questions, loading} , props) {
    const id = props.match
    return {
        loading,
        questions,
        id
        
    }
};

export default connect(mapStateToProps)(QuestionDetails);