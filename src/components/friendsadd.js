import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from './dashboard';
import { listFriends } from '../actions';
import {CSSTransition, TransitionGroup} from 'react-transition-group';


function Friendsadd() {

    const dispatch = useDispatch();
    const [addFriend, setAddFriend] = useState("");
    const requestData = useSelector(state => state.requestData)

    return (
        <div>
            <div className="card friend-panel-item d-flex justify-content-around">
                <span className="close-button" onClick={() => dispatch(listFriends())}>x</span>
                <div className="mx-auto text-center">
                    <input className="form-control add-input" placeholder="Your friends username." type="text" onChange={(e) => setAddFriend(e.target.value)}></input> 
                    <div className="text-center">
                        <button className="btn btn-success my-3" onClick={() => socket.emit('send_request', addFriend)}>Add</button>
                    </div>
                </div>
                <ul className="list-group list-group-flush rounded-5 overflow-auto">
                    <div className="card-header">Requests</div>
                    <TransitionGroup>
                        {requestData && requestData.map((item) => (
                            <CSSTransition timeout={300} classNames="friend-list-item" key={item}>
                                <li className="friend-list-item list-group-item">
                                    <div className="mx-auto">{item}</div>   
                                    <button className="btn btn-outline-success mx-auto" onClick={() => socket.emit('accept_request', item)}>Accept</button> 
                                </li>
                            </CSSTransition>
                            )
                        )} 
                    </TransitionGroup>
                </ul>
            </div>
        </div>
    )
}

export default Friendsadd;