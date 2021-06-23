import React, {useEffect, useRef} from'react';
import {useSelector, useDispatch} from 'react-redux';
import {setConversation, showConversation} from '../../actions';
import styles from '../../styles/overview.module.css';

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
        <div className={styles.timeline}>
            <div className={styles.timeline__header}>Activity Log</div>
            <div className={styles.timeline__content} ref={displayRef}>
                {timelineEvents.map(item => (
                    <div className={styles.timeline__event}>
                        <em className={styles.timeline_link} onClick={()=> handleClick(item.username)}>
                            {item.username}
                        </em>
                        &nbsp;{item.message}&nbsp; 
                        <time className={styles.timeline__time}>
                            {item.time}
                        </time>
                    </div>
                    )
                )}
            </div>
        </div>
    )
}

export default Timeline;