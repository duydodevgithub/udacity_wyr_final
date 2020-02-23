import {_getQuestions, _getUsers} from "../utils/_DATA";


//Receive data action
export const receiveDataAction = (todos, goals) => {
    return {
        type: "RECEIVE_DATA",
        todos,
        goals
    }
}

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
            Promise.all([
                _getQuestions(),
                _getUsers()
            ]).then(([questions, users]) => {
                const answerArr = Object.keys(users[authedUser].answers);
                answerArr.forEach(element => {
                    delete questions[element];
                });
                const questionsArr = Object.values(questions);
                dispatch(loadQuestions(questionsArr));
            })
            .catch(() =>{
                alert("Error in loading Data. Please contact IT");
            })
        }
}

