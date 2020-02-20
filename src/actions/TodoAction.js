import uuid from "react-uuid";

export const addGoalAction = ({name} = {}) => {
    return {
        type: 'ADD_GOAL',
        goal: {
            id: uuid(),
            name,
            complete: false
        }
    }
}

export const addTodoAction = ({name} = {}) => {
    return {
        type: 'ADD_TODO',
        todo: {
            id: uuid(),
            name,
            complete: false
        }
    }
}

export const removeTodoAction = (id) => {
    console.log(id);
    return {
        type: "REMOVE_TODO",
        removeTodo: {
            id: id
        }
    }
}

export const removeGoalAction = (id) => {
    return {
        type: "REMOVE_GOAL",
        removeGoal: {
            id: id
        }
    }
}

export const receiveDataAction = (todos, goals) => {
    return {
        type: "RECEIVE_DATA",
        todos,
        goals
    }
}