
export const auth = (id) => {
    return {
        type: 'AUTH',
        auth: {
            id,
            login: false
        }
    }
}