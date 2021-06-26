import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../dashboard';
import { showRequestMessage, hideRequestMessage } from '../../actions';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from '../../styles/friendPanel.module.css';
import styled from 'styled-components';

const RequestItem = styled.div`
  position:absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  opacity: ${p => p.show ? 1:0};
  transition: 300ms ease;
  transition-delay: ${p => p.show ? "300ms": "0s"};
  z-index: ${p => p.show ? 1: 0};
`

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

    return (
       
        <div className={styles.container}>
            <div className={styles.list}>
                  <RequestItem show={show}>
                      <div className={styles.message}>
                        <div className={styles.message__icon}>
                          <i className={requestMessage.type==='success' ? "far fa-check-circle": "fas fa-exclamation-triangle"}></i>
                        </div>
                        <div className={styles.message_msg}>
                          {requestMessage.msg}
                        </div>
                        <button className={styles.message__button} onClick={()=> dispatch(hideRequestMessage())}><i className="fas fa-times"></i></button>
                      </div>
                  </RequestItem>    
                  <RequestItem show={!show}>
                      <div className={styles.add}>
                          <input className={styles.addInput} placeholder="Username..." type="text" onChange={(e) => setAddFriend(e.target.value)}></input>
                          <button className={styles.addButton} onClick={() => socket.emit('send_request', addFriend, localStorage.getItem('token'))} data-toggle="tooltip" data-placement="top" title="Send Request">
                              <i className="fas fa-plus"></i>
                          </button> 
                      </div>
                  </RequestItem>
            </div>
            <ul className={styles.list}>
                <div className={styles.list__header}>Requests</div>
                <TransitionGroup>
                    {requestData && requestData.map((item) => (
                        <CSSTransition timeout={300} classNames="friend-list-item" key={item._id}>
                            <li className="friend-list-item">
                                <div className="mx-auto">{item.user.username}</div>   
                                <div>
                                    <button className={styles.accept} onClick={() => socket.emit('accept_request', item.user.username, localStorage.getItem('token'))} data-toggle="tooltip" data-placement="top" title="Accept">
                                        <i className="fas fa-check"></i>
                                    </button> 
                                    <button className={styles.decline} onClick={() => socket.emit('decline_request', item.user.username, localStorage.getItem('token'))} data-toggle="tooltip" data-placement="top" title="Decline">
                                      <i className="fas fa-times"></i>
                                    </button> 
                                </div>
                            </li>
                        </CSSTransition>
                        )
                    )} 
                </TransitionGroup>
            </ul>
        </div>
    )
}

export default Friendsadd;