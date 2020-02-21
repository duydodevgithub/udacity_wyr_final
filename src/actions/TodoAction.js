import uuid from "react-uuid";

//Goal action
export const addGoalAction = (name) => {
    return {
        type: 'ADD_GOAL',
        goal: {
            id: uuid(),
            name,
            complete: false
        }
    }
}

export function handleAddGoal(goal) {
    return (dispatch) => {
        dispatch(addGoalAction(goal));
        return window.API.saveGoal(goal.name)
        .catch(() => {
            dispatch(removeGoalAction(goal));
            alert("An error has been occured. Try again!")
        })
    }
}

export const removeGoalAction = (goal) => {
    return {
        type: "REMOVE_GOAL",
        removeGoal: {
            id: goal.id
        }
    }
}

export function handleRemoveGoal(goal) {
    return (dispatch) => {
        dispatch(removeGoalAction(goal));
        return window.API.deleteGoal(goal.id)
        .catch(() => {
            dispatch(addGoalAction(goal.name));
            alert("An error has been occured. Try again!")
        })
    }
}

//To do action

export const addTodoAction = (name) => {
    return {
        type: 'ADD_TODO',
        todo: {
            id: uuid(),
            name,
            complete: false
        }
    }
}

export const removeTodoAction = (todo) => {
    // console.log(id);
    return {
        type: "REMOVE_TODO",
        removeTodo: {
            id : todo.id
        }
    }
}

export function handleRemoveTodo(todo) {
    console.log(todo);
    return (dispatch) => {
        dispatch(removeTodoAction(todo));
        return window.API.deleteTodo(todo.id)
        .catch(()=> {
            dispatch(addTodoAction(todo.name));
            alert("An error has been occured. Try again!")
        })
    }
}

export function handleAddTodo(todo) {
    return(dispatch) => {
        dispatch(addTodoAction(todo))
        return window.API.saveTodo(todo.name)
        .catch(()=>{
            dispatch(removeTodoAction(todo));
            alert("An error has been occured. Try again!")
        })
    }
}

