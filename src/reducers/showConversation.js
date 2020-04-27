const showConversationReducer = (state=false, action) => {
    switch(action.type) {
        case "SHOW_CONVERSATION":
            return true
        case "HIDE_CONVERSATION":
            return false
        default:
            return state
    }
}

export default showConversationReducer;