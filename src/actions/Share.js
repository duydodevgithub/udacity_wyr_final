import {getInitialData} from "../utils/api";
import {showLoading, hideLoading} from "react-redux-loading";


//Receive data action
// export const receiveDataAction = (todos, goals) => {
//     return {
//         type: "RECEIVE_DATA",
//         todos,
//         goals
//     }
// }

export const loadUserList = (users) => {
    return {
        type: "RECEIVE_USERS",
        users
    }
}

export const loadQuestions = (questions) => {
    return {
        type: "RECEIVE_QUESTIONS",
        questions
    }
}

export const handleLoadInitialData = (authedUser) => {
        return (dispatch) => {
            dispatch(showLoading());
            return getInitialData()
            .then(({users, questions}) => {
                console.log(questions);
                dispatch(loadQuestions(questions));
                dispatch(loadUserList(users));
            }).then(() => {
                dispatch(hideLoading());
            })
            .catch(() => {
                alert("Error getting initial data. Please contact IT");
            })
        }
}