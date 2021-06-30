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

export const clearLoginErrors = () => {
    return {
        type: "CLEAR_LOGIN_ERRORS"
    }
}

export const setFriendData = (data) => {
    return {
        type: "SET_FRIEND_DATA",
        payload: data
    }
}

export const setRequestData = (data) => {
    return {
        type: "SET_REQUEST_DATA",
        payload: data
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

export const addMessage = (data) => {
  return {
    type: "ADD_MESSAGE",
    payload: data
  }
}

export const clearMessages = () => {
  return {
    type: "CLEAR_MESSAGES"
  }
}

export const setUnreadData = (data) => {
    return {
        type: "SET_UNREAD_DATA", 
        payload: data
    }
}

export const setIsTyping = (friend) => {
    return {
        type: "SET_IS_TYPING",
        payload: friend
    }
}

export const setNotTyping = (friend) => {
    return {
        type: "SET_NOT_TYPING",
        payload: friend
    }
}

export const addEvent = (event) => {
    return {
        type: "ADD_EVENT",
        payload: event
    }
}

export const clearEvents = () => {
    return {
        type: "CLEAR_EVENTS"
    }
}

export const userLogout = () => {
    return {
        type: "USER_LOGOUT"
    }
}

export const toggleFriendPanel = () => {
  return {
    type: "TOGGLE_FRIEND_PANEL"
  }
}

export const closeFriendPanel = () => {
  return {
    type: "CLOSE_FRIEND_PANEL"
  }
}

export const openFriendPanel = () => {
  return {
    type: "OPEN_FRIEND_PANEL"
  }
}

export const addConversation = (friend) => {
  return {
    type: "ADD_CONVO",
    payload: friend
  }
}

export const closeConversation = (friend) => {
  return {
    type: "CLOSE_CONVO",
    payload: friend
  }
}

export const bringToFront = (friend) => {
  return {
    type: "BRING_TO_FRONT",
    payload: friend
  }
}