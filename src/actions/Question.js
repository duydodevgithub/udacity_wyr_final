import uuid from "react-uuid";
import {saveQuestion} from "../utils/api";

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
        dispatch(addQuestionAction(question));

        saveQuestion(question)
        .catch(() => {
            dispatch(removeQuestionAction(question));
            alert("Error saving question. Please try again");
        })
    }
}