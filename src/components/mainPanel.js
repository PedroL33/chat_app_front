import React from 'react';
import FriendPanel from './friendPanel';
import ChatPanel from './chatPanel';
import Overview from './overview';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../actions';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Sidebar from './sidebar';
import {socket} from './dashboard';

function MainPanel() {
    const dispatch = useDispatch()
    const showConversation = useSelector(state => state.showConversation)
    function signout() {
        dispatch(userLogout())
        socket.disconnect();
        localStorage.removeItem('token');
    }

    return (
        <div className="row main-panel">
            <span className="close-button" onClick={()=>signout()} data-toggle="tooltip" data-placement="top" title="Logout">
                <i className="fas fa-power-off"></i>
            </span>
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