import React, {useEffect, useRef} from'react';
import {useSelector, useDispatch} from 'react-redux';
import {setConversation, showConversation} from '../actions';
import moment from 'moment';

function Timeline() {

    const timelineEvents = useSelector(state => state.timelineEvents)
    const dispatch = useDispatch();
    const didMountRef = useRef(null)
    const displayRef = useRef(null)

    useEffect(() => {
        if(didMountRef.current) {
          displayRef.current.scrollTop = displayRef.current.scrollHeight;
        }
        else {
          didMountRef.current=true;
        }
      })

    function handleClick(username) {
        dispatch(setConversation(username))
        dispatch(showConversation())
    }

    return (
        <div className="timeline-container shadow bg-white">
            <div className="timeline-header">Activity Log</div>
            <div className="timeline" ref={displayRef}>
                {timelineEvents.map(item => (
                    <div className="timeline-event">
                        <em className="friend-link" onClick={()=> handleClick(item.username)}>
                            {item.username}
                        </em>
                        &nbsp;{item.message}&nbsp; 
                        <time className="timeline-event-time">
                            {moment.tz(item.time, "America/Los_Angeles")}
                        </time>
                    </div>
                    )
                )}
            </div>
        </div>
    )
}

export default Timeline;