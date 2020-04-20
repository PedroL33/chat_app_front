const friendPanelReducer = (state=false, action) => {
    switch(action.type) {
        case "ADD_FRIENDS":
            return "add"
        case "LIST_FRIENDS":
            return "list"
        default:
            return state;
    }
}

export default friendPanelReducer;