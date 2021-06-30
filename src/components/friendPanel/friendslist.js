import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setConversation, addConversation } from '../../actions';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import { socket } from '../dashboard';
import styles from '../../styles/friendPanel.module.css';

function Friendslist() {

    const dispatch = useDispatch()
    const friendData = useSelector(state => state.friendData)
    const unreadData = useSelector(state => state.unreadData)
    const currentConversation = useSelector(state => state.currentConversation)
    const show = useSelector(state => state.showConversation)
    const conversations = useSelector(state => state.conversations)

    function handleClick(friend) {
        socket.emit('mark_read', friend)
        dispatch(setConversation(friend))
        dispatch(addConversation(friend))
    }

    return (          
        <div className={styles.container}>
            <ul className={styles.list}>
                <div className={styles.list__header}>Online</div>
                <TransitionGroup>
                    {friendData.online && Object.keys(friendData.online).map((friend) => (
                        <CSSTransition timeout={300} classNames="friend-list-item" key={friend}>
                            <li className={currentConversation===friend && show ? "friend-list-item active" : "friend-list-item"} onClick={() => handleClick(friend)}
                             data-toggle="tooltip" data-placement="right" title={`${friend} is ${friendData.online[friend].status}`}>
                                <div>{friend}</div>
                                {friendData.online[friend] && friendData.online[friend].isTyping ? <div>...</div>: null}
                                {unreadData[friend] && <div className={styles.list__unread}>{unreadData[friend]}</div>}
                            </li>
                        </CSSTransition>
                        )
                    )}
                </TransitionGroup>
            </ul> 
            <ul className={styles.list}>
                <div className={styles.list__header}>Offline</div>
                <TransitionGroup>
                    {friendData.offline && Object.keys(friendData.offline).map((friend) => (
                        <CSSTransition timeout={300} classNames="friend-list-item" key={friend}>
                            <li className={conversations.includes(friend) ? "friend-list-item active" : "friend-list-item"} onClick={() => handleClick(friend)}
                             data-toggle="tooltip" data-placement="right" title={`${friend} is offline.`}>
                                <div>{friend}</div>  
                                {unreadData[friend] && <div className={styles.list__unread}>{unreadData[friend]}</div>}  
                            </li>
                        </CSSTransition>
                        )
                    )} 
                </TransitionGroup>
            </ul>
        </div>
    )
}

export default Friendslist;