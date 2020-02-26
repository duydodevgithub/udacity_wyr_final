
export const loading = (state = true, action) => {
    switch (action.type) {
        case "RECEIVE_DATA":
            return false;
        case "RECEIVE_USERS":
            return false;
        case "RECEIVE_QUESTIONS":
            return false;
        default:
            return state;
    }
}