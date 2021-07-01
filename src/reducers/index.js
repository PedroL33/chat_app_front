import { combineReducers } from 'redux';
import navReducer from '../reducers/navigation';
import authReducer from '../reducers/authentication';
import loginErrorReducer from '../reducers/loginErrors';
import signupErrorsReducer from '../reducers/signupErrors';
import friendDataReducer from './friendData';
import requestDataReducer from './requestData';
import requestMessageReducer from './requestMessage';
import currentUserReducer from './currentUser';
import messageDataReducer from './messageData';
import unreadDataReducer from './unreadData';
import timelineEventsReducer from './timelineEvents';
import openFriendPanel from './openFriendPanel';
import conversations from './conversations';
import isResponsive from './isResponsive';

const appReducer = combineReducers({
    nav: navReducer,
    authenticated: authReducer,
    loginErrors: loginErrorReducer,
    signupErrors: signupErrorsReducer,
    friendData: friendDataReducer,
    requestData: requestDataReducer,
    requestMessage: requestMessageReducer,
    currentUser: currentUserReducer,
    messageData: messageDataReducer,
    unreadData: unreadDataReducer,
    timelineEvents: timelineEventsReducer,
    openFriendPanel,
    conversations,
    isResponsive
})

const rootReducer = (state, action) => {
    if(action.type==="USER_LOGOUT") {
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer;