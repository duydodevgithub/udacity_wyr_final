
export const addTodoAction = ({name} = {}) => {
    return {
        type: 'ADD_TODO',
        todo: {
            id: 0,
            name,
            complete: false
        }
    }
}