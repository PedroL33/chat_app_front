const friendDataReducer = (state={}, action) => {
    switch(action.type) {
        case "SET_FRIEND_DATA":
            return action.payload
        default:
            return state
    }
}

export default friendDataReducer;