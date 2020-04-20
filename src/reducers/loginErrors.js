const loginErrorReducer = (state={}, action) => {
    switch(action.type) {
        case "SET_LOGIN_ERRORS":
            return action.payload
        case "CLEAR_LOGIN_ERRORS":
            return {}
        default:
            return state;
    }
}

export default loginErrorReducer;