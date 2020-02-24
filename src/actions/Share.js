import {getInitialData} from "../utils/api";


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

export const handleLoadQuestions = (authedUser) => {
        return (dispatch) => {
            return getInitialData()
            .then(({users, questions}) => {
                // console.log(users, questions);
                dispatch(loadQuestions(questions));
            })
            .catch(() => {
                alert("Error getting initial data. Please contact IT");
            })
        }
}