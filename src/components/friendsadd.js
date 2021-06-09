import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../context/socket';
import { listFriends, showRequestMessage, hideRequestMessage } from '../actions';
import {CSSTransition, TransitionGroup, SwitchTransition} from 'react-transition-group';


function Friendsadd() {

    const dispatch = useDispatch();
    const [addFriend, setAddFriend] = useState("");
    const requestData = useSelector(state => state.requestData)
    const show = useSelector(state => state.requestMessage)
    const [requestMessage, setRequestMessage] = useState({})
    const socket = useContext(SocketContext);

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
        <div className="h-100">
            <div className="friend-panel-item">
                <span className="close-button" onClick={() => handleClick()}><span aria-hidden="true">&times;</span></span>
                <div className="add-form-container">
                    <SwitchTransition mode='out-in'>
                        <CSSTransition key={show} timeout={300} classNames='request-panel-item'>
                            { show ?  <div className="request-message-container">
                                {requestMessage.type==='success' ? <i className="far fa-check-circle mx-auto"></i>: <i class="fas fa-exclamation-triangle"></i>}
                                <div className="p-2">{requestMessage.msg}</div>
                                <button className="btn btn-success btn-sm" onClick={()=> dispatch(hideRequestMessage())}>Ok</button>
                            </div>
                            :<div>
                                <div className="add-input-container">
                                    <input className="form-control" placeholder="Username..." type="text" onChange={(e) => setAddFriend(e.target.value)}></input>
                                    <button className="btn btn-success btn-sm add-button" onClick={() => socket.emit('send_request', addFriend, localStorage.getItem('token'))} data-toggle="tooltip" data-placement="top" title="Send Request">
                                        <i className="fas fa-plus"></i>
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
                            <CSSTransition timeout={300} classNames="friend-list-item" key={item._id}>
                                <li className="friend-list-item">
                                    <div className="mx-auto">{item.user.username}</div>   
                                    <div>
                                        <button className="btn btn-success btn-sm mr-auto" onClick={() => socket.emit('accept_request', item.user.username, localStorage.getItem('token'))} data-toggle="tooltip" data-placement="top" title="Accept">
                                            <i className="fas fa-check"></i>
                                        </button> 
                                        <button className="btn btn-danger btn-sm ml-auto" onClick={() => socket.emit('decline_request', item.user.username, localStorage.getItem('token'))} data-toggle="tooltip" data-placement="top" title="Decline">
                                            <span aria-hidden="true">&times;</span>
                                        </button> 
                                    </div>
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