import React from 'react';
import FriendPanel from './friendPanel';
import ChatPanel from './chatPanel';
import Overview from './overview';
import { useSelector } from 'react-redux';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Sidebar from './sidebar';
function MainPanel() {

    const showConversation = useSelector(state => state.showConversation)
    
    return (
        <div className="row main-panel">
            <Sidebar />
            <FriendPanel />
            <div id="content" className="content">
                <SwitchTransition mode="out-in">
                    <CSSTransition key={showConversation} timeout={300} classNames='main-panel-item'>
                        {showConversation ? <ChatPanel /> : <Overview />}
                    </CSSTransition>
                </SwitchTransition>
            </div>
        </div>
    )
}

export default MainPanel;