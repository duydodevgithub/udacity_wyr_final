export const checker = (store) => (next) => (action) => {
    if(
        action.type === "ADD_TODO" &&
        action.todo.name.toLowerCase().includes('bitcoin')
    ) {
        return alert("Nope. That's a bad idea");
    }
    if(
        action.type === "ADD_GOAL" &&
        action.goal.name.toLowerCase().includes('bitcoin')
    ) {
        return alert("Nope. That's a bad idea");
    }
    
    return next(action);
}

export const logger = (store) => (next) => (action) => {
    console.group();
    console.log("Current state: ", store.getState());
    console.log("Current action is: ", action);
    const result = next(action);
    console.log("The new state: ", store.getState());
    console.groupEnd();
    return result;
}