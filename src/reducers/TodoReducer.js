// export const  todos = (state = [], action) => {
//     switch(action.type) {
//         case 'ADD_TODO':
//             return [...state, action.todo];
//         case "REMOVE_TODO":
//             return state.filter((todo) => (
//                 todo.id !== action.removeTodo.id
//             ))
//         case "RECEIVE_DATA":
//             return action.todos
//         default:
//             return state;
//     }
// }

// export const goals = (state = [], action) => {
//     switch(action.type) {
//         case 'ADD_GOAL':
//             return [...state, action.goal]
//         case 'REMOVE_GOAL':
//             return state.filter((goal) => (
//                 goal.id !== action.removeGoal.id
//             ))
//         case "RECEIVE_DATA":
//             return action.goals
//         default:
//             return state;
//     }
// }

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