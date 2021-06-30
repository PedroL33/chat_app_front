import React from 'react';
import OpenFriendPanel from './friendPanel/openFriendPanel';
import UpdateStatus from './friendPanel/overview/updateStatus';
import { useSelector } from 'react-redux';
import ChatPanel from './chatPanel/chatPanel';

function MainPanel() {

  const conversations = useSelector(state => state.conversations);

    return (
        <div className="main-panel">
            <OpenFriendPanel />
            <div className="content">
                <div>Chat App</div>
                <UpdateStatus />
                {
                  conversations.map(item => <div key={item}><ChatPanel friend={item}></ChatPanel></div>)
                }
            </div>
        </div>
    )
}

export default MainPanel;