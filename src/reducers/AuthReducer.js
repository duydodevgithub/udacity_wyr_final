export const authedUser = (state = [], action) => {
    switch(action.type) {
        case "AUTHED_USER":
            return [...state, action.auth];
        case "LOGOUT_USER":
            return state = []
        default:
            return state
    }
}
