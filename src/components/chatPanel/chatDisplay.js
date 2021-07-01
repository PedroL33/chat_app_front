import React, { useState, useEffect, useRef, useCallback } from 'react';
import { socket } from '../dashboard';
import { useSelector } from 'react-redux';
import moment from 'moment';
import debounce from 'lodash/debounce';
import styles from '../../styles/chatPanel.module.css';

const ChatDisplay = (props) => {

    const inputRef = useRef(null);
    const displayRef = useRef(null);
    const didMountRef = useRef(false)
    const [message, setMessage] = useState("");
    const currentUser = useSelector(state => state.currentUser);
    const messageData = useSelector(state => state.messageData);
    const friendData = useSelector(state => state.friendData);
    const currentConversation = messageData.filter(item => item.to===props.friend || item.from===props.friend);
    const friendInfo = friendData.online[props.friend] ? friendData.online[props.friend]: friendData.offline[props.friend]
    const isOnline = friendData.online[props.friend] ? true: false;

    useEffect(() => {
      if(didMountRef.current) {
        displayRef.current.scrollTop = displayRef.current.scrollHeight;
      }
      else {
        didMountRef.current=true;
      }
    })

    function sendMessage() {
      var newMessage = {
        from: currentUser.username,
        to: props.friend,
        message: message,
        time: Date.now()
      }
      socket.emit('message', newMessage)
      inputRef.current.value = "";
    }

    const stopTyping = useCallback(debounce(() => {
      socket.emit('stopped_typing', {to: props.friend, from: currentUser.username})
    }, 1000), [])

    function handleChange(e) {
      setMessage(e.target.value)
      socket.emit('started_typing', {to: props.friend, from: currentUser.username})
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
      <div className={styles.display}>
        <div>
          <div className={`${styles.content__profileImg} ${isOnline ? styles.online: styles.offline}`} style={{backgroundImage: `url(${friendInfo.picture})`}}></div>
        </div>
        <div className={styles.messagesWrapper}>
          <div ref={displayRef} className={styles.messages}>
            {currentConversation.map(item => (
                <div className={item.to===currentUser.username ? `${styles.message} ${styles.to}` : `${styles.message} ${styles.from}`} key={item._id}>
                  <div className={styles.message__contents}>
                    <div className={styles.message__msg}>
                      <div>{item.message}</div>
                    </div>
                  </div>
                  <div className={styles.message__time}>&nbsp;{moment(item.time).utc().fromNow()}</div>
                </div>
              )
            )}
          </div>
          {friendData.online[props.friend] && friendData.online[props.friend].isTyping ? <div className={styles.display__isTyping}>{props.friend} is typing...</div>: null}
        </div>
        <textarea ref={inputRef} className={styles.display__input} value={message} onChange={(e)=> handleChange(e)} onKeyPress={(e)=> handleKeyPress(e)} placeholder="What on your mind..."></textarea>
      </div>
    )
}

export default ChatDisplay;