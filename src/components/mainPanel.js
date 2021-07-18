import React, {useEffect} from 'react';
import OpenFriendPanel from './friendPanel/openFriendPanel';
import UpdateStatus from './friendPanel/overview/updateStatus';
import { useSelector, useDispatch } from 'react-redux';
import ChatPanel from './chatPanel/chatPanel';
import Notifications from './notifications';
import { isResponsive, notResponsive } from '../actions';

function MainPanel() {

  const dispatch = useDispatch();
  const conversations = useSelector(state => state.conversations);

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  useEffect(() => {
    if(window.innerWidth < 1000) {
      dispatch(isResponsive());
    }
  }, [])

  const handleResize = (e) => {
    if(window.innerWidth < 1000) {
      dispatch(isResponsive());
    }else {
      dispatch(notResponsive());
    }
  } 

    return (
        <div className="main-panel">
            <OpenFriendPanel />
            <Notifications />
            <div className="content">
                <div style={{fontSize: "100px", opacity: "0.2", userSelect: "none"}}>Chat App</div>
                <UpdateStatus />
                {
                  conversations.map(item => <div key={item}><ChatPanel friend={item}></ChatPanel></div>)
                }
            </div>
        </div>
    )
}

export default MainPanel;