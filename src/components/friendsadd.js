import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from './dashboard';
import { listFriends, showRequestMessage, hideRequestMessage } from '../actions';
import {CSSTransition, TransitionGroup, SwitchTransition} from 'react-transition-group';


function Friendsadd() {

    const dispatch = useDispatch();
    const [addFriend, setAddFriend] = useState("");
    const requestData = useSelector(state => state.requestData)
    const show = useSelector(state => state.requestMessage)
    const [requestMessage, setRequestMessage] = useState({})

    useEffect(() => {
        socket.on('request_message', (message) => {
            setRequestMessage(message)
            dispatch(showRequestMessage())
        })

        return function cleanup() {
            socket.off('request_message')
        }
    })

    function handleClick() {
        dispatch(hideRequestMessage())
        dispatch(listFriends())
    }

    return (
        <div>
            <div className="card friend-panel-item d-flex justify-content-around ">
                <span className="close-button" onClick={() => handleClick()}><i class="far fa-times-circle"></i></span>
                <div className="add-form-container">
                    <SwitchTransition mode='out-in'>
                        <CSSTransition key={show} timeout={300} classNames='request-panel-item'>
                            { show ?  <div className="request-message-container">
                                {requestMessage.type==='success' ? <i className="far fa-check-circle text-success"></i>: <i class="fas fa-exclamation-triangle text-warning"></i>}
                                <div className="p-2">{requestMessage.msg}</div>
                                <button className="btn btn-success btn-sm" onClick={()=> dispatch(hideRequestMessage())}>Ok</button>
                            </div>
                            :<div>
                                <div className="add-input-container">
                                    <input className="form-control" placeholder="Username..." type="text" onChange={(e) => setAddFriend(e.target.value)}></input> 
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-success btn-sm mt-3" onClick={() => socket.emit('send_request', addFriend)}>
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div> } 
                        </CSSTransition>
                    </SwitchTransition>
                </div>
                <ul className="requests-container list-group list-group-flush overflow-auto">
                    <div className="card-header">Requests</div>
                    <TransitionGroup>
                        {requestData && requestData.map((item) => (
                            <CSSTransition timeout={300} classNames="friend-list-item" key={item}>
                                <li className="friend-list-item list-group-item">
                                    <div className="mx-auto">{item}</div>   
                                    <button className="btn btn-success btn-sm mx-auto" onClick={() => socket.emit('accept_request', item)}><i className="far fa-check-circle"></i></button> 
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