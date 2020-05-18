const friendDataReducer = (state={}, action) => {
    switch(action.type) {
        case "SET_FRIEND_DATA":
            return action.payload
        case "SET_IS_TYPING":
            return {...state, online: {...state.online, [action.payload]: {...state.online[action.payload], isTyping: true}}}
        case "SET_NOT_TYPING":
            return {...state, online: {...state.online, [action.payload]: {...state.online[action.payload], isTyping: false}}}
        default:
            return state
    }
}

export default friendDataReducer;