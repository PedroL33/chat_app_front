import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFriends, setConversation, showConversation } from '../actions';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import { socket } from './dashboard';

function Friendslist() {

    const dispatch = useDispatch()
    const friendData = useSelector(state => state.friendData)
    const unreadData = useSelector(state => state.unreadData)
    const requestData = useSelector(state => state.requestData)
    const currentConversation = useSelector(state => state.currentConversation)
    const show = useSelector(state => state.showConversation)

    function handleClick(friend) {
        socket.emit('mark_read', friend)
        dispatch(setConversation(friend))
        dispatch(showConversation())
        document.getElementsByClassName('bm-overlay')[0].click();
    }

    return (          
        <div className="friend-panel-item justify-content-between position-relative">
            <ul className="list-group list-group-flush">
                <div className="card-header">Online</div>
                <TransitionGroup>
                    {friendData.online && Object.keys(friendData.online).map((friend) => (
                        <CSSTransition timeout={300} classNames="friend-list-item" key={friend}>
                            <li className={currentConversation===friend && show ? "friend-list-item active" : "friend-list-item"} onClick={() => handleClick(friend)}
                             data-toggle="tooltip" data-placement="right" title={`${friend} is ${friendData.online[friend].status}`}>
                                <div className="friendlist-image" style={{backgroundImage: `url(${friendData.online[friend].picture})`}} ></div>
                                <div>{friend}</div>
                                {friendData.online[friend] && friendData.online[friend].isTyping ? <div>...</div>: null}
                                {unreadData[friend] && <div className="unread bg-warning">{unreadData[friend]}</div>}
                            </li>
                        </CSSTransition>
                        )
                    )}
                </TransitionGroup>
            </ul>
            <ul className="list-group list-group-flush">
                <div className="card-header">Offline</div>
                <TransitionGroup>
                    {friendData.offline && Object.keys(friendData.offline).map((friend) => (
                        <CSSTransition timeout={300} classNames="friend-list-item" key={friend}>
                            <li className={currentConversation===friend && show ? "friend-list-item active" : "friend-list-item"} onClick={() => handleClick(friend)}
                             data-toggle="tooltip" data-placement="right" title={`${friend} is offline.`}>
                                <div>{friend}</div>  
                                {unreadData[friend] && <div className="unread bg-warning">{unreadData[friend]}</div>}  
                            </li>
                        </CSSTransition>
                        )
                    )} 
                </TransitionGroup>
            </ul>
            <button className= "mx-auto my-3 text-center btn btn-success position-relative" onClick={()=> dispatch(addFriends())} data-toggle="tooltip" data-placement="top" title="Add friends!">
                <i className="fas fa-user-plus"></i>
                {requestData.length > 0 && <div className="request-data-notification bg-danger">{requestData.length}</div>}
            </button>
        </div>
    )
}

export default Friendslist;