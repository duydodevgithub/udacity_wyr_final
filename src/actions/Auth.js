export const auth = (id) => {
    return {
        type: 'AUTHED_USER',
        auth: {
            id
        }
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT_USER',
    }
}

export const redirectFlag = () => {
    return {
        type: 'REDIRECT'
    }
}