//Receive data action
export const receiveDataAction = (todos, goals) => {
    return {
        type: "RECEIVE_DATA",
        todos,
        goals
    }
}


