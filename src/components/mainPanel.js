import React from 'react';
import FriendPanel from './friendPanel';
import ChatPanel from './chatPanel';
import { useSelector } from 'react-redux';

function MainPanel() {

    const conversation = useSelector(state => state.currentConversation)

    return (
        <div className="d-flex flex-row w-100 bg-white">
            <div className={conversation==="" ? "main-panel-item hidden" : "main-panel-item"}>
                <ChatPanel conversation={conversation} />
            </div>
            <FriendPanel />
        </div>
    )
}

export default MainPanel;