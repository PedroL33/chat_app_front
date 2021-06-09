import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideConversation } from '../actions';
import { SwitchTransition, CSSTransition} from 'react-transition-group';
import { SocketContext } from '../context/socket';
import moment from 'moment';
import debounce from 'lodash/debounce';

function ChatPanel() {

    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const displayRef = useRef(null);
    const didMountRef = useRef(false)
    const [message, setMessage] = useState("");
    const socket = useContext(SocketContext);
    const currentUser = useSelector(state => state.currentUser);
    const messageData = useSelector(state => state.messageData);
    const friendData = useSelector(state => state.friendData);
    const conversationUser = useSelector(state => state.currentConversation)
    const friendInfo = friendData.online[conversationUser] ? friendData.online[conversationUser]: friendData.offline[conversationUser]
    const isOnline = friendData.online[conversationUser] ? true: false;
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
      dispatch(hideConversation())
    }

    function sendMessage() {
      var newMessage = {
        from: currentUser.username,
        to: conversationUser,
        message: message,
        time: Date.now()
      }
      socket.emit('message', newMessage)
      inputRef.current.value = "";
    }

    const stopTyping = useCallback(debounce(function() {
      socket.emit('stopped_typing', {to: conversationUser, from: currentUser.username})
    }, 1000), [])

    function handleChange(e) {
      setMessage(e.target.value)
      socket.emit('started_typing', {to: conversationUser, from: currentUser.username})
      stopTyping();
    }

    function handleKeyPress(e) {
      if(e.which===13) {
        e.preventDefault();
        if(message.length > 0) {
          sendMessage();
          setMessage("")
        }
      }
    }

    return (
      <SwitchTransition mode='out-in'>
        <CSSTransition key={conversationUser} timeout={300} classNames="conversation">
          <div className="conversation position-relative shadow">
              <span className="close-chat-button" onClick={() => handleClick()} data-toggle="tooltip" data-placement="right" title="Back to timeline.">
                <i class="fas fa-arrow-circle-left"></i>
              </span>
              <div>
                <div className="profile-image mx-auto" style={{backgroundImage: `url(${friendInfo.picture})`}} >
                  <div className={isOnline ? "online-status bg-success": "online-status bg-danger"}></div>
                </div>
                <div className="conversation-name">{conversationUser}</div>
              </div>
              <div className="chat-display-wrapper">
                <div ref={displayRef} className="chat-display">
                  {currentConversation.map(item => (
                      <div className={item.to===currentUser.username ? "message-container to" : "message-container from"} key={item._id}>
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
              <textarea ref={inputRef} className="chat-input" value={message} onChange={(e)=> handleChange(e)} onKeyPress={(e)=> handleKeyPress(e)} placeholder="What on your mind..."></textarea>
              <input type="text" ref={inputRef} className="responsive-input form-control" onChange={(e)=> handleChange(e)} onKeyPress={(e)=> handleKeyPress(e)} placeholder="What on your mind..." />
          </div>
        </CSSTransition>
      </SwitchTransition>
    )
}

export default ChatPanel;