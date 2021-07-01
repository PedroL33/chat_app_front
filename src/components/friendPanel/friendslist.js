import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConversation, closeFriendPanel, hideRequestMessage } from '../../actions';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import { socket } from '../dashboard';
import styles from '../../styles/friendPanel.module.css';

const Friendslist = () => {

    const dispatch = useDispatch();
    const friendData = useSelector(state => state.friendData);
    const unreadData = useSelector(state => state.unreadData);
    const conversations = useSelector(state => state.conversations);
    const isResponsive = useSelector(state => state.isResponsive);

    function handleClick(friend) {
        socket.emit('mark_read', friend);
        dispatch(addConversation(friend));
        if(isResponsive) {
          dispatch(closeFriendPanel());
          dispatch(hideRequestMessage())
        }
    }

    return (          
        <div className={styles.container}>
            <ul className={styles.list}>
                <div className={styles.list__header}>Online</div>
                <TransitionGroup>
                    {friendData.online && Object.keys(friendData.online).map((friend) => (
                        <CSSTransition timeout={300} classNames="friend-list-item" key={friend}>
                            <li className={conversations.includes(friend)  ? "friend-list-item active" : "friend-list-item"} onClick={() => handleClick(friend)}
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