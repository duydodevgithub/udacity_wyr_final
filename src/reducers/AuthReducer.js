export const authedUser = (state = null, action) => {
    switch(action.type) {
        case "AUTHED_USER":
            return  action.auth.id;
        case "LOGOUT_USER":
            return state = null
        default:
            return state
    }
}


