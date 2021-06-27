import React from 'react';
import OpenFriendPanel from './friendPanel/openFriendPanel';
import UpdateStatus from './friendPanel/overview/updateStatus';

function MainPanel() {

    return (
        <div className="row main-panel">
            <OpenFriendPanel />
            <div id="content" className="content">
                <div>Chat App</div>
                <UpdateStatus />
            </div>
        </div>
    )
}

export default MainPanel;