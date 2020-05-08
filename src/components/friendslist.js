import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFriends, setConversation, showConversation, logout } from '../actions';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import { socket } from './dashboard';

function Friendslist() {

    const dispatch = useDispatch()
    const friendData = useSelector(state => state.friendData)
    const unreadData = useSelector(state => state.unreadData)
    const currentConversation = useSelector(state => state.currentConversation)

    function handleClick(friend) {
        socket.emit('mark_read', friend)
        dispatch(setConversation(friend))
        dispatch(showConversation())
    }

    function signout() {
        dispatch(logout())
        socket.disconnect();
        localStorage.removeItem('token');
    }

    return (          
        <div className="friend-panel-item justify-content-between position-relative">
            <span className="close-button" onClick={()=>signout()}>Logout</span>
            <ul className="list-group list-group-flush overflow-auto">
                <div className="card-header">Online</div>
                <TransitionGroup>
                    {friendData.online && Object.keys(friendData.online).map((friend) => (
                        <CSSTransition timeout={300} classNames="friend-list-item" key={friend}>
                            <li className={currentConversation===friend ? "friend-list-item list-group-item active" : "friend-list-item list-group-item"} onClick={() => handleClick(friend)}>
                                <div>{friend}</div>
                                {friendData.online[friend] && friendData.online[friend].isTyping ? <div>...</div>: null}
                                {unreadData[friend] && <div className="unread bg-warning">{unreadData[friend]}</div>}
                            </li>
                        </CSSTransition>
                        )
                    )}
                </TransitionGroup>
            </ul>
            <ul className="list-group list-group-flush overflow-auto">
                <div className="card-header">Offline</div>
                <TransitionGroup>
                    {friendData.offline && Object.keys(friendData.offline).map((friend) => (
                        <CSSTransition timeout={300} classNames="friend-list-item" key={friend}>
                            <li className="friend-list-item list-group-item">
                                <div>{friend}</div>    
                            </li>
                        </CSSTransition>
                        )
                    )} 
                </TransitionGroup>
            </ul>
            <button className= "mx-auto mt-3 text-center btn btn-success" onClick={()=> dispatch(addFriends())}>
                <i className="fas fa-user-plus"></i>
            </button>
        </div>
    )
}

export default Friendslist;