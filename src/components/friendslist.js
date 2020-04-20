import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFriends, setConversation } from '../actions';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

function Friendslist() {

    const dispatch = useDispatch()
    const friendData = useSelector(state => state.friendData)
    const currentConversation = useSelector(state => state.currentConversation)

    return (          
        <div className="card friend-list d-flex flex-column justify-content-between">
            
            <ul className="list-group list-group-flush">
                <div className="card-header">Online</div>
                <TransitionGroup>
                    {friendData.online && friendData.online.map((item, i) => (
                        <CSSTransition timeout={300} classNames="friend-list-item" key={item}>
                            <li className={currentConversation===item ? "friend-list-item list-group-item active" : "friend-list-item list-group-item"}>
                                <div onClick={() => dispatch(setConversation(item))} className="ml-2">{item}</div>
                            </li>
                        </CSSTransition>
                        )
                    )}
                </TransitionGroup>
            </ul>
            <ul className="list-group list-group-flush">
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