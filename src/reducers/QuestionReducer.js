export const questions = (state = {}, action) => {
    switch(action.type) {
        case "ADD_QUESTION":
            return {...state, [action.question.id]: action.question}
        case "RECEIVE_QUESTIONS":
            return action.questions
        default:
            return state;
    }
}