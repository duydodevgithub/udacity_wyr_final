import uuid from "react-uuid";
import {saveQuestion} from "../utils/api";
import {handleLoadInitialData} from "../actions/Share";
import { _saveQuestionAnswer } from "../utils/_DATA";
import {showLoading, hideLoading} from "react-redux-loading";

//add new question
const addQuestionAction = (question) => {
    // console.log("hereeee");
    return {
        type: 'ADD_QUESTION',
        question: {
            id: uuid(),
            author: question.author,
            optionOneText: question.optionOneText,
            optionTwoText: question.optionTwoText
        }
    }
}

const removeQuestionAction = (question) => {
    return {
        type: "REMOVE_QUESTION",
        question: {
            id: question.id
        }
    }
}

export function handleAddQuestion(question) {
    console.log("From action handleAddQuestion: ", question);
    return (dispatch) => {
        dispatch(showLoading());
        dispatch(addQuestionAction(question));
        saveQuestion(question)
        .catch(() => {
            dispatch(removeQuestionAction(question));
            alert("Error saving question. Please try again");
        }).then(() =>{
            dispatch(showLoading());

            dispatch(handleLoadInitialData());
            dispatch(hideLoading());

        }).then(() => {
            dispatch(hideLoading());
        })
    }
}

//answer question action

// const answerQuestionAction = (answer) => {
//     return {
//         type: "ANSWER_QUESTION",
//         answer
//     }
// }

export function handleSaveAnswerQuestion(answer) {
    console.log(answer);
    return (dispatch) => {
        dispatch(showLoading());
        _saveQuestionAnswer(answer)
        .catch(() => {
            alert("Errors updating answer. Please try again")
        }).then(() =>{
            dispatch(handleLoadInitialData());
        }).then(()=>{
            dispatch(hideLoading());
        })
    }
}