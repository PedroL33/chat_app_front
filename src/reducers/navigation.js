const navReducer = (state="", action) => {
    switch(action.type) {
        case "NAV_LOGIN":
            return "login"
        case "NAV_SIGNUP":
            return "signup"
        case "NAV_INFO":
            return "info"
        default:
            return state
    }
}

export default navReducer;