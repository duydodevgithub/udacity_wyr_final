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
        let input1 = document.getElementById("formGroupExampleInput1");
        let input2 = document.getElementById("formGroupExampleInput2");

        e.preventDefault();
        if(e.target.option1.value === "" || e.target.option2.value === "") {
            alert("Input can't be blank");
        } else {
            // console.log(e.target);

            dispatch(handleAddQuestion(
                {
                    optionOneText: e.target.option1.value,
                    optionTwoText: e.target.option2.value,
                    author: this.props.authedUser
                }
            ))

            input1.value = '';
            input2.value = '';
        }
    }

    render() {
        // console.log(this.props.authedUser[0].id);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h3>Hello {this.props.authedUser}!</h3>
                        <h5>Please add your new question</h5>
                        <form onSubmit={this.handleFormSubmit}>
                            <h3>Would you rather...</h3>
                            <div className="form-group">
                                {/* <label htmlFor="formGroupExampleInput2">Option 1</label> */}
                                <input name="option1" type="text" className="form-control" id="formGroupExampleInput1" placeholder="Option 1" />
                            </div>
                            <h3>Or</h3>

                            <div className="form-group">
                                {/* <label htmlFor="formGroupExampleInput2">Option 2</label> */}
                                <input name="option2" type="text" className="form-control" id="formGroupExampleInput2" placeholder="Option 2" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const ConnectedQuestion = connect((store) =>({
    loading: store.loading,
    authedUser: store.authedUser
}))(Newquestion);

export default ConnectedQuestion;