const messageDataReducer = (state=[], action) => {
    switch(action.type) {
        case "SET_MESSAGE_DATA":
          return action.payload
        case "ADD_MESSAGE":
          return [...state, action.payload]  
        case "CLEAR_MESSAGES":
          return []
        default:
          return state
    }
}

export default messageDataReducer;