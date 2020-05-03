import React, {useState, useEffect, useRef, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideConversation, clearConversation } from '../actions';
import { SwitchTransition, CSSTransition} from 'react-transition-group';
import { socket } from './dashboard';
import moment from 'moment';
import debounce from 'lodash/debounce';

function ChatPanel() {

    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const displayRef = useRef(null);
    const didMountRef = useRef(false)
    const [message, setMessage] = useState("");
    const currentUser = useSelector(state => state.currentUser);
    const messageData = useSelector(state => state.messageData);
    const friendData = useSelector(state => state.friendData);
    const conversationUser = useSelector(state => state.currentConversation)
    const currentConversation = messageData.filter(item => item.to===conversationUser || item.from===conversationUser);

 
    useEffect(() => {
      if(didMountRef.current) {
        displayRef.current.scrollTop = displayRef.current.scrollHeight;
      }
      else {
        didMountRef.current=true;
      }
    })

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

    const stopTyping = useCallback(debounce(function() {
      socket.emit('stopped_typing', {to: conversationUser, from: currentUser})
    }, 1000), [])

    function handleChange(e) {
      setMessage(e.target.value)
      socket.emit('started_typing', {to: conversationUser, from: currentUser})
      stopTyping();
    }

    function handleKeyPress(e) {
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
              <div className="chat-display-wrapper">
                <div ref={displayRef} className="chat-display">
                  {currentConversation.map(item => (
                      <div className={item.to===currentUser ? "message-container to" : "message-container from"} key={item.id}>
                        <div className="message-contents">
                          <div className="message">
                            <div>{item.message}</div>
                          </div>
                        </div>
                        <div className="message-time">&nbsp;{moment(item.time).utc().fromNow()}</div>
                      </div>
                    )
                  )}
                </div>
                {friendData.online[conversationUser] && friendData.online[conversationUser].isTyping ? <div className="is-typing">{conversationUser} is typing...</div>: null}
              </div>
              <textarea ref={inputRef} className="mx-auto" onChange={(e)=> handleChange(e)} onKeyPress={(e)=> handleKeyPress(e)} placeholder="What on your mind..."></textarea>
              <button className="btn btn-success mt-3" onClick={()=> sendMessage()}>Send</button>
          </div>
        </CSSTransition>
      </SwitchTransition>
    )
}

export default ChatPanel;