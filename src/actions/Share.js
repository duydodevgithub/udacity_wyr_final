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


