import React from 'react';
import {connect} from "react-redux";
import {handleAddQuestion} from "../../actions/Question";

class Newquestion extends React.Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(e) {
        const {dispatch} = this.props;
        e.preventDefault();
        if(e.target.option1.value === "" || e.target.option2.value === "") {
            alert("Input can't be blank");
        } else {
            // console.log(e.target);

            dispatch(handleAddQuestion(
                {
                    optionOneText: e.target.option1.value,
                    optionTwoText: e.target.option2.value,
                    author: this.props.authedUser[0].id
                }
            ))
        }
    }

    render() {
        // console.log(this.props.authedUser[0].id);
        return (
            <div>
                <h2>Hello {this.props.authedUser[0].id}! Please enter your new options</h2>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="form-group">
                        {/* <label htmlFor="formGroupExampleInput2">Option 1</label> */}
                        <input name="option1" type="text" className="form-control" id="formGroupExampleInput2" placeholder="Option 1" />
                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="formGroupExampleInput2">Option 2</label> */}
                        <input name="option2" type="text" className="form-control" id="formGroupExampleInput2" placeholder="Option 2" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

const ConnectedQuestion = connect((store) =>({
    loading: store.loading,
    authedUser: store.authedUser
}))(Newquestion);

export default ConnectedQuestion;