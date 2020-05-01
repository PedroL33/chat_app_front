import React, {useState, useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideConversation, clearConversation } from '../actions';
import { SwitchTransition, CSSTransition} from 'react-transition-group';
import { socket } from './dashboard';
import moment from 'moment';

function ChatPanel() {

    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const displayRef = useRef(null);
    const [message, setMessage] = useState("");
    const currentUser = useSelector(state => state.currentUser);
    const messageData = useSelector(state => state.messageData);
    const conversationUser = useSelector(state => state.currentConversation)
    const currentConversation = messageData.filter(item => item.to===currentUser || item.from===currentUser);
    
    useEffect(() => {
      if(currentConversation.length) {
        displayRef.current.scrollIntoView({behavior: 'smooth'}) 
      }
    }, [messageData])

    function handleClick() {
      dispatch(clearConversation())
      dispatch(hideConversation())
    }

    function sendMessage() {
      var newMessage = {
        from: currentUser,
        to: conversationUser,
        message: message,
        time: Date.now()
      }
      socket.emit('message', newMessage)
      inputRef.current.value = "";
    }

    function handleKeyDown(e) {
      if(e.which===13) {
        e.preventDefault();
        sendMessage();
      }
    }

    return (
      <SwitchTransition mode='out-in'>
        <CSSTransition key={conversationUser} timeout={300} classNames="conversation">

          <div className="conversation position-relative overflow-hidden">
              <span className="close-button" onClick={() => handleClick()}>
                <i class="far fa-times-circle"></i>
              </span>
              <div className="text-center">{conversationUser}</div>
              <div className="chat-display">
                {currentConversation.map(item => (
                    <div ref={displayRef} className={item.to===currentUser ? "message-container to" : "message-container from"} key={item.id}>
                      <div className="message-contents">
                        <p className="message">
                          <div>{item.message}</div>
                        </p>
                      </div>
                      <div className="message-time">&nbsp;{moment(item.time).utc().fromNow()}</div>
                    </div>
                  )
                )}
              </div>
              <textarea ref={inputRef} className="mx-auto" onChange={(e)=> setMessage(e.target.value)} onKeyDown={(e)=> handleKeyDown(e)} placeholder="What on your mind..."></textarea>
              <button className="btn btn-success mt-3" onClick={()=> sendMessage()}>Send</button>
          </div>
        </CSSTransition>
      </SwitchTransition>
    )
}

export default ChatPanel;