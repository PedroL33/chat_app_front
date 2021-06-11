import React, {useState, useEffect} from 'react';
import { navLogin, navSignup } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import {addMessage, clearMessages} from '../actions';
import styles from '../styles/info.module.css';

function Info() {

    const dispatch = useDispatch();
    const [isTyping, setIsTyping] = useState(false);
    const infoMsgs = useSelector(state => state.messageData)
    var messages = [
      {message:"Hi, welcome to Chat App!", time: "just now"}, 
      {message:"Login or Signup to start chatting with your friends.", time: "just now"}, 
      {message: "What are you waiting for!?!?", time: "just now"}
    ]

    useEffect(()=> {
      var timeouts = []
      for(let i=0; i<messages.length;i++) {
        timeouts.push(setTimeout(() => {setIsTyping(true)}, ((i-1)*3000)+3000))
        timeouts.push(setTimeout(() => {newMessage(messages[i])}, ((i)*3000)+2000))
        timeouts.push(setTimeout(() => {setIsTyping(false)}, ((i)*3000)+2000))
      }
      return function cleanup() {
        timeouts.forEach(item => clearTimeout(item))
        dispatch(clearMessages())
      }
    }, [])

    function newMessage(message) {
      dispatch(addMessage(message))
    }

    function handleClick(e, action) {
        e.preventDefault()
        dispatch(action);
    }

    return (
        <div className={styles.info}>
          <div className={styles.contents}>
            <div className={styles.conversationContainer}>
              <div>
                <i className="far fa-comment-dots"></i>
                <div className={styles.title}>Chat App</div>
              </div>
              <div className={styles.chatContainer}>
                {infoMsgs.map(item => (
                    <div className={styles.message} key={item.message}>
                      <div className={styles.messageContents}>
                        {item.message}
                      </div>
                      <div className={styles.messageTime}>&nbsp;{item.time}</div>
                    </div>
                  )
                )}
                {isTyping ? <div className={styles.isTyping}>Chat App is typing...</div>: null}
              </div>
              <textarea className={styles.input} placeholder="What on your mind..." disabled></textarea>
            </div>
            <div className={styles.infoSide}>
              <h1>A simple way to connect to your circle.</h1>
              <div className={styles.infoButtons}>
                <button className={styles.landingButton} onClick={(e) => handleClick(e, navLogin())}>Login</button>
                <button className={styles.landingButton} onClick={(e) => handleClick(e, navSignup())}>Signup</button>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Info;