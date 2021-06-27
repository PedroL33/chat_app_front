import React from 'react';
import OpenFriendPanel from './friendPanel/openFriendPanel';
import UpdateStatus from './friendPanel/overview/updateStatus';

function MainPanel() {

    return (
        <div className="main-panel">
            <OpenFriendPanel />
            <div className="content">
                <div>Chat App</div>
                <UpdateStatus />
            </div>
        </div>
    )
}

export default MainPanel;