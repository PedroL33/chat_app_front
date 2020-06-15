import React, {useState, useEffect} from 'react';
import { navLogin, navSignup } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import {addMessage, clearMessages} from '../actions';

function Info() {

    const dispatch = useDispatch();
    const [isTyping, setIsTyping] = useState(false);
    const infoMsgs = useSelector(state => state.messageData)
    var messages = [{message:"Hi, welcome to Chat App!", time: "just now"}, {message:"Login or Signup to start chatting with your friends.", time: "just now"}, {message: "What are you waiting for!?!?", time: "just now"}]

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
        <div className="info row">
          <div className="conversation info-conversation position-relative shadow">
            <div>
              <div className="info-profile-image mx-auto" >
                <i className="far fa-comment-dots"></i>
                <div className="online-status bg-success"></div>
              </div>
              <div className="conversation-name">Chat App</div>
            </div>
            <div className="chat-display-wrapper">
              <div className="chat-display">
                {infoMsgs.map(item => (
                    <div className="message-container to" key={item.message}>
                      <div className="message-contents">
                        <div className="message">
                          <div>{item.message}</div>
                        </div>
                      </div>
                      <div className="message-time">&nbsp;{item.time}</div>
                    </div>
                  )
                )}
              </div>
              {isTyping ? <div className="is-typing">Chat App is typing...</div>: null}
            </div>
            <textarea className="chat-input" placeholder="What on your mind..." disabled></textarea>
            <input type="text" className="responsive-input form-control" placeholder="What on your mind..." />
          </div>
          <div class="info-side-container col-md-7">
            <div className="info-side">
              <h1>A simple way to connect to your circle.</h1>
              <h3>Communication can be difficult, the software you use shouldn't be.</h3>
              <div className="info-buttons">
                <button className="landing-button" onClick={(e) => handleClick(e, navLogin())}>Login</button>
                <button className="landing-button" onClick={(e) => handleClick(e, navSignup())}>Signup</button>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Info;