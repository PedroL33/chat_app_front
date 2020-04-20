const currentConversationReducer = (state="", action) => {
    switch(action.type) {
        case "SET_CONVERSATION":
            return action.payload
        case "CLEAR_CONVERSATION":
            return ''
        default:
            return state
    }
}

export default currentConversationReducer;