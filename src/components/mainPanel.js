import React from 'react';
import FriendPanel from './friendPanel';
import ChatPanel from './chatPanel';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

function MainPanel() {

    const conversation = useSelector(state => state.currentConversation)
    const showConversation = useSelector(state => state.showConversation)
    return (
        <div className="d-flex justify-content-around overflow-hidden">
            <FriendPanel />
            <CSSTransition in={showConversation} timeout={300} classNames='main-panel-item' unmountOnExit mountOnEnter>
                <ChatPanel conversation={conversation} /> 
            </CSSTransition>
        </div>
    )
}

export default MainPanel;