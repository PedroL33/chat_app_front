const unreadDataReducer = (state={}, action) => {
    switch(action.type) {
        case "SET_UNREAD_DATA":
            return action.payload
        default:
            return state
    }
}

export default unreadDataReducer;