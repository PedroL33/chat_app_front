const timelineEventsReducer = (state=[], action) => {
    switch(action.type) {
        case "ADD_EVENT":
            return [...state, action.payload]
        case "CLEAR_EVENTS":
            return [];
        default:
            return state
    }
}

export default timelineEventsReducer;