import React from 'react';
import { useDispatch} from 'react-redux';
import { clearConversation } from '../actions';
import { SwitchTransition, CSSTransition} from 'react-transition-group';

function ChatPanel(props) {
    const dispatch = useDispatch();

    return (

        <SwitchTransition mode='out-in'>
          <CSSTransition key={props.conversation} timeout={300} classNames="conversation">
            <div className="conversation overflow-hidden position-relative">
                <span className="close-button" onClick={() => dispatch(clearConversation())}>x</span>
                <div className="text-center">{props.conversation}</div>
                <div className="chat-display">
                  
                </div>
                <textarea className="mx-auto"></textarea>
                <button className="btn btn-success mt-3">Send</button>
            </div>
          </CSSTransition>
        </SwitchTransition>
    )
}

export default ChatPanel;