const requestMessageReducer = (state=false, action) => {
    switch(action.type) {
        case "SHOW_REQUEST_MESSAGE":
            return true
        case "HIDE_REQUEST_MESSAGE":
            return false
        default:
            return state
    }
}

export default requestMessageReducer;