import { combineReducers } from 'redux';
import navReducer from '../reducers/navigation';
import authReducer from '../reducers/authentication';
import loginErrorReducer from '../reducers/loginErrors';
import signupErrorsReducer from '../reducers/signupErrors';
import friendDataReducer from './friendData';
import currentConversationReducer from './currentConversation';
import requestDataReducer from './requestData';
import showConversationReducer from './showConversation';
import requestMessageReducer from './requestMessage';
import currentUserReducer from './currentUser';
import messageDataReducer from './messageData';
import unreadDataReducer from './unreadData';
import timelineEventsReducer from './timelineEvents';
import openFriendPanel from './openFriendPanel';

const appReducer = combineReducers({
    nav: navReducer,
    authenticated: authReducer,
    loginErrors: loginErrorReducer,
    signupErrors: signupErrorsReducer,
    friendData: friendDataReducer,
    currentConversation: currentConversationReducer,
    requestData: requestDataReducer,
    showConversation: showConversationReducer,
    requestMessage: requestMessageReducer,
    currentUser: currentUserReducer,
    messageData: messageDataReducer,
    unreadData: unreadDataReducer,
    timelineEvents: timelineEventsReducer,
    openFriendPanel
})

const rootReducer = (state, action) => {
    if(action.type==="USER_LOGOUT") {
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer;