export const users = (state = [], action) => {
    switch(action.type) {
        case "RECEIVE_USERS":
            return [...state, action.users]
        default:
            return state;
    }
}

export const questions = (state = [], action) => {
    switch(action.type) {
        case "RECEIVE_QUESTIONS":
            return [...state, action.questions]
        default:
            return state;
    }
}