import React, {useEffect, useRef} from'react';
import {useSelector, useDispatch} from 'react-redux';
import {setConversation, showConversation} from '../actions';

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
        <div className="timeline-container">
            <div className="timeline-header">Activity Log</div>
            <div className="timeline" ref={displayRef}>
                {timelineEvents.map(item => (
                    <div className="timeline-event">
                        {
                            item.type==="online" ? <div className="d-flex"><div className="friend-link" onClick={()=> handleClick(item.username)}>{item.username}&nbsp;</div> is now online.</div>:
                            item.type==="offline" ? <div className="d-flex"><div className="friend-link" onClick={()=> handleClick(item.username)}>{item.username}&nbsp;</div> is now offline.</div>:
                            item.type==="picture" ? <div className="d-flex"><div className="friend-link" onClick={()=> handleClick(item.username)}>{item.username}&nbsp;</div> changed their profile picture.</div>:
                            <div className="d-flex"><div className="friend-link" onClick={()=> handleClick(item.username)}>{item.username}&nbsp;</div> is now {item.status}.</div>
                        }
                        {item.type==="picture" && <div className="timeline-image" style={{backgroundImage: `url(${item.url})`}} ></div>}
                    </div>
                    )
                )}
            </div>
        </div>
    )
}

export default Timeline;