import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFriends, setConversation, showConversation, logout } from '../actions';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import { socket } from './dashboard';

function Friendslist() {

    const dispatch = useDispatch()
    const friendData = useSelector(state => state.friendData)
    const currentConversation = useSelector(state => state.currentConversation)

    function handleClick(item) {
        dispatch(setConversation(item))
        dispatch(showConversation())
    }

    function signout() {
        dispatch(logout())
        socket.disconnect();
        localStorage.removeItem('token');
    }

    return (          
        <div className="card friend-panel-item justify-content-between position-relative">
            <span className="close-button" onClick={()=>signout()}>Logout</span>
            <ul className="list-group list-group-flush overflow-auto">
                <div className="card-header">Online</div>
                <TransitionGroup>
                    {friendData.online && friendData.online.map((item, i) => (
                        <CSSTransition timeout={300} classNames="friend-list-item" key={item}>
                            <li className={currentConversation===item ? "friend-list-item list-group-item active" : "friend-list-item list-group-item"}>
                                <div onClick={() => handleClick(item)} className="ml-2">{item}</div>
                            </li>
                        </CSSTransition>
                        )
                    )}
                </TransitionGroup>
            </ul>
            <ul className="list-group list-group-flush overflow-auto">
                <div className="card-header">Offline</div>
                <TransitionGroup>
                    {friendData.offline && friendData.offline.map((item, i) => (
                        <CSSTransition timeout={300} classNames="friend-list-item" key={item}>
                            <li className="friend-list-item list-group-item">
                                <div className="ml-2">{item}</div>    
                            </li>
                        </CSSTransition>
                        )
                    )} 
                </TransitionGroup>
            </ul>
            <button className= "mx-auto mt-5 w-50 btn btn-success" onClick={()=> dispatch(addFriends())}>+</button>
        </div>
    )
}

export default Friendslist;