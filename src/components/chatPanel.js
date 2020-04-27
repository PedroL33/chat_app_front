import React, {useState} from 'react';
import { useDispatch} from 'react-redux';
import { hideConversation, clearConversation } from '../actions';
import { SwitchTransition, CSSTransition} from 'react-transition-group';
import { socket } from './dashboard';

function ChatPanel(props) {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("")

    function handleClick() {
      dispatch(clearConversation())
      dispatch(hideConversation())
    }

    return (

        <SwitchTransition mode='out-in'>
          <CSSTransition key={props.conversation} timeout={300} classNames="conversation">

            <div className="conversation position-relative overflow-hidden">
                <span className="close-button" onClick={() => handleClick()}>
                  <i class="far fa-times-circle"></i>
                </span>
                <div className="text-center">{props.conversation}</div>
                <div className="chat-display">

                </div>
                <textarea className="mx-auto" onChange={(e)=> setMessage(e.target.value)}></textarea>
                <button className="btn btn-success mt-3" onClick={()=> socket.emit("new_message", message)}>Send</button>
            </div>
          </CSSTransition>
        </SwitchTransition>
    )
}

export default ChatPanel;