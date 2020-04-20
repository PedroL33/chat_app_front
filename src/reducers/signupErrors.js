const signupErrorsReducer = (state={}, action) => {
    switch(action.type) {
        case "SET_SIGNUP_ERRORS":
            return action.payload
        case "CLEAR_SIGNUP_ERRORS":
            return {}
        default:
            return state
    }
}

export default signupErrorsReducer;