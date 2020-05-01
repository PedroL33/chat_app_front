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

export const setRequestData = (data) => {
    return {
        type: "SET_REQUEST_DATA",
        payload: data
    }
}

export const showConversation = () => {
    return {
        type: "SHOW_CONVERSATION"
    }
}

export const hideConversation = () => {
    return {
        type: "HIDE_CONVERSATION"
    }
}

export const showRequestMessage = () => {
    return {
        type: "SHOW_REQUEST_MESSAGE"
    }
}

export const hideRequestMessage = () => {
    return {
        type: "HIDE_REQUEST_MESSAGE"
    }
}

export const setCurrentUser = (user) => {
    return {
        type: "SET_CURRENT_USER",
        payload: user
    }
}

export const setMessageData = (data) => {
    return {
        type: "SET_MESSAGE_DATA",
        payload: data
    }
}

export const setUnreadData = (data) => {
    return {
        type: "SET_UNREAD_DATA", 
        payload: data
    }
}