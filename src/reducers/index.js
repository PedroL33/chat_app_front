import { combineReducers } from 'redux';
import navReducer from '../reducers/navigation';
import authReducer from '../reducers/authentication';
import loginErrorReducer from '../reducers/loginErrors';
import signupErrorsReducer from '../reducers/signupErrors';
import friendPanelReducer from './friendPanel';
import friendDataReducer from './friendData';
import currentConversationReducer from './currentConversation';

const rootReducer = combineReducers({
    nav: navReducer,
    authenticated: authReducer,
    loginErrors: loginErrorReducer,
    signupErrors: signupErrorsReducer,
    friendPanel: friendPanelReducer,
    friendData: friendDataReducer,
    currentConversation: currentConversationReducer
})

export default rootReducer;