export const loginSuccess = () => {
    return {
        type: "LOGIN_SUCCESS"
    }
}

export const logout = () => {
    return { 
        type: "LOGOUT"
    }
}

export const navLogin = () => {
    return {
        type: "NAV_LOGIN"
    }
}

export const navSignup = () => {
    return {
        type: "NAV_SIGNUP"
    }
}

export const navInfo = () => {
    return {
        type: "NAV_INFO"
    }
}

export const setLoginErrors = (errors) => {
    return {
        type: "SET_LOGIN_ERRORS",
        payload: errors
    }
}

export const clearLoginErrors = () => {
    return {
        type: "CLEAR_LOGIN_ERRORS"
    }
}

export const setSignupErrors = (errors) => {
    return {
        type: "SET_SIGNUP_ERRORS",
        payload: errors
    }
}

export const clearSignupErrors = () => {
    return { 
        type: "CLEAR_SIGNUP_ERRORS"
    }
}

export const addFriends = () => {
    return {
        type: "ADD_FRIENDS"
    }
}

export const listFriends = () => {
    return {
        type: "LIST_FRIENDS"
    }
}

export const setFriendData = (data) => {
    return {
        type: "SET_FRIEND_DATA",
        payload: data
    }
}

export const newOnlineFriend = (friend) => {
    return {
        type: "NEW_ONLINE_FRIEND",
        payload: friend
    }
}

export const newOfflineFriend = (friend) => {
    return {
        type: "NEW_OFFLINE_FRIEND",
        payload: friend
    }
}

export const removeRequest = (request) => {
    return {
        type: "REMOVE_REQUEST",
        payload: request
    }
}

export const newRequest = (request) => {
    return {
        type: "NEW_REQUEST",
        payload: request
    }
}

export const setConversation = (friend) => {
    return {
        type: "SET_CONVERSATION",
        payload: friend
    }
}

export const clearConversation = () => {
    return {
        type: "CLEAR_CONVERSATION"
    }
}
